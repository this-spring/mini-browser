/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-21 00:12:57
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-21 00:29:25
*/
const fs = require('fs');
const { HtmlParser, JsParser, CssParser } = require('../parser.js');
// 读取c文件
const str = fs.readFileSync('../../html/1.html', 'utf-8');
// htmlparser
const tree = HtmlParser(str);
console.log(tree);
// jsparser runtime
(function walkTree(root) {
    if (!root) return;
    const stack = [];
    stack.push(root);
    while(stack.length > 0) {
        for (let i = 0, len = stack.length; i < len; i += 1) {
            const item = stack.pop();
            if (item.text == 'script') {
                const str = item.childrens[0].text;
                console.log(str)
            }
            for (let j = 0, len = item.childrens.length; j < len; j += 1) {
                stack.push(item.childrens[j]);
            }
        }
    }
})(tree)
debugger