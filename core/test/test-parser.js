/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-21 00:12:57
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-21 14:44:49
*/
const fs = require('fs');
const { NodeType } = require('../node-type.js');
const { HtmlParser, JsParser, CssParser, bfs } = require('../parser.js');
// 读取c文件
const str = fs.readFileSync('../../html/1.html', 'utf-8');
// htmlparser
const tree = HtmlParser(str);
console.log(tree);
// jsparser runtime
bfs(tree, (node) => {
    if (node.type == NodeType.ELEMENT_NODE && node.tagName == 'script') {
        JsParser(node);
    }
})
debugger