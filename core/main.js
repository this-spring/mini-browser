/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 14:15:56
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 16:01:36
*/
const { Request } = require('./request');
const { NodeType, RenderTreeNode } = require('./node-type.js');
const { HtmlParser, JsParser, CssParser, bfs } = require('./parser.js');
const str = 'http://local.h5.com/mygithub/mini-browser/html/1.html';
class Browser {
    constructor() {
        this.request = new Request();
        this.html = '';
        this.tree = null;
        this.renderTree = null;
        this.cssMap = new Map();
    }
    async run() {
        const request = this.request.req;
        // 1. req html
        this.html = await request(str);
        // 2. parser html
        this.tree = await this.parserHtml();
        // 3. jsparer runtime cssparser
        this.parserJSCSS();
        // 4. make render tree
        this.renderTree = this.makeRenderTree(this.tree);
        // 5. css to renderTree
        this.cssToRenderTree();
        console.log(this.renderTree);
        debugger;
    }

    async parserHtml() {
        return await HtmlParser(this.html);
    }

    parserJSCSS() {
        bfs(this.tree, (node) => {
            if (node.type == NodeType.ELEMENT_NODE && node.tagName == 'script') {
                JsParser(node);
            }
            if (node.tagName == 'style' || node.tagName == 'link') {
                this.cssMap = CssParser(node);
            }
        });
    }

    cssToRenderTree() {
        bfs(this.renderTree, (node) => {
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
            this.cssMap.get(ele) && this.cssMap.get(ele).forEach((kv) => {
                Object.assign(renderAttribute, renderAttribute, kv);
            });
            this.cssMap.get(`.${classs}`) && this.cssMap.get(`.${classs}`).forEach((kv) => {
                Object.assign(renderAttribute, renderAttribute, kv);
            });
            this.cssMap.get(`#${id}`) && this.cssMap.get(`#${id}`).forEach((kv) => {
                Object.assign(renderAttribute, renderAttribute, kv);
            });
            node.renderAttribute = renderAttribute;
        });
    }

    makeRenderTree(root) {
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
            const rtNode = this.makeRenderTree(root.childrens[i]);
            rtNode && node.childrens.push(rtNode);
        }
        if (node.type == NodeType.ELEMENT_NODE && node.childrens.length == 0) return null;
        return node;
    }
}
const b = new Browser();
b.run();
