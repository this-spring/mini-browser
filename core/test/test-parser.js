/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-21 00:12:57
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 15:41:36
*/
const fs = require('fs');
const { NodeType, RenderTreeNode } = require('../node-type.js');
const { HtmlParser, JsParser, CssParser, bfs } = require('../parser.js');
// 读取c文件
const str = fs.readFileSync('../../html/1.html', 'utf-8');
let tree = null;
let cssMap = new Map();
// const reg = /(^\s+$)|(^\n+$)/ig;

function makeRenderTree(root) {
    if (root.tagName == 'style'
        || root.tagName == 'script'
        || root.tagName == 'link' 
        || root.type == NodeType.DOCUMENT_NODE 
        || root.type == NodeType.COMMENT_NODE
        || (root.type == NodeType.TEXT_NODE && root.text.trim() == '')) return null;
    const node = new RenderTreeNode();
    if (root.type == NodeType.TEXT_NODE) {
       root.tagName = 'word';
       node.text = root.text;
    }
    node.tagName = root.tagName;
    node.type = root.type;
    node.attribute = root.attribute;
    for (let i = 0; i < root.childrens.length; i += 1) {
        const rtNode = makeRenderTree(root.childrens[i]);
        rtNode && node.childrens.push(rtNode);
    }
    if (node.type == NodeType.ELEMENT_NODE && node.childrens.length == 0) return null;
    return node;
}

(async () => {
    // htmlparser
    tree = await HtmlParser(str);
    // jsparser runtime
    bfs(tree, (node) => {
        if (node.type == NodeType.ELEMENT_NODE && node.tagName == 'script') {
            JsParser(node);
        }
        if (node.tagName == 'style' || node.tagName == 'link') {
            cssMap = CssParser(node);
            console.log(cssMap);
        }
    });
    // make render tree
    const renderTree = makeRenderTree(tree);
    // css to renderTree
    bfs(renderTree, (node) => {
        const renderAttribute = node.renderAttribute;
        const ele = node.tagName;
        let classs = '';
        let id = '';
        for (let i = 0; i < node.attribute.length; i += 1) {
            if (node.attribute[i].class) {
                classs = node.attribute[i].class;
            }
            if (node.attribute[i].id) {
                id = node.attribute[i].id;
            }
        }
        cssMap.get(ele) && cssMap.get(ele).forEach((kv) => {
            Object.assign(renderAttribute, renderAttribute, kv);
        });
        cssMap.get(`.${classs}`) && cssMap.get(`.${classs}`).forEach((kv) => {
            Object.assign(renderAttribute, renderAttribute, kv);
        });
        cssMap.get(`#${id}`) && cssMap.get(`#${id}`).forEach((kv) => {
            Object.assign(renderAttribute, renderAttribute, kv);
        });
        node.renderAttribute = renderAttribute;
    });
    // debug
    debugger;
})();
