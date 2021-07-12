/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 14:15:56
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-07-12 12:46:49
*/
const { Request } = require('./request');
const { NodeType, RenderTreeNode } = require('./node-type.js');
const { HtmlParser, JsParser, CssParser, bfs } = require('./parser.js');
const str = 'http://127.0.0.1:80/index.html';
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
    }

    querySelector(id) {
        let res = null;
        bfs(this.renderTree, (node) => {
            node.attribute.forEach((item) => {
                if (item.k == 'id' && `#${item.v}` == id) {
                    res = node;
                }
            });
        });
        return res;
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
        console.log('parser css res:', this.cssMap);
        debugger
    }

    cssToRenderTree() {
        bfs(this.renderTree, (node) => {
            const renderAttribute = node.renderAttribute;
            const ele = node.tagName;
            let classs = '';
            let id = '';
            for (let i = 0; i < node.attribute.length; i += 1) {
                if (node.attribute[i].k == 'class') {
                    classs = node.attribute[i].v;
                }
                if (node.attribute[i].k == 'id') {
                    id = node.attribute[i].v;
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
let document = {};
const b = new Browser();
document = b;
globalThis.document = document = b;
module.exports = { b, bfs }