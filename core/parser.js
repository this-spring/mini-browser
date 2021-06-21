/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 18:27:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-21 14:47:11
*/
const { Node, NodeType } = require('./node-type'); 

const kvReg = /[^ ]*=[^ ]*/g;
// var reg = /[^ ]*=[^ ]*/g
function bfs(root, start) {
    if (!root) return;
    const stack = [];
    stack.push(root);
    while(stack.length > 0) {
        for (let i = 0, len = stack.length; i < len; i += 1) {   
            const item = stack.pop();         
            for (let j = 0, len = item.childrens.length; j < len; j += 1) {
                stack.push(item.childrens[j]);
            }
            start(item);
        }
    }
}

function JsParser(node) {
    let scriptStr = '';
    node.childrens.forEach(item => {
        scriptStr += item.text;
    });
    eval(scriptStr)
}

function CssParser(str) {
    
}

function HtmlParser(str) {
    let i = 0;
    const back = () => i --;
    const next = () => i ++;
    const getNext = (num) => str[i + num];
    const getLast = (num) => str[i - num];
    function parserDocument() {
        const node = new Node(NodeType.DOCUMENT_NODE);
        let text = '';
        while (i < str.length) {
            text += str[i];
            if (str[i] == '>') {
                i += 1;
                break;
            };
            i += 1;
        }
        node.text = text;
        return node;
    }
    function parserComment() {
        const node = new Node(NodeType.COMMENT_NODE);
        let text = '';
        while(i < str.length) {
            text += str[i];
            if (str[i] == '>') {
                i += 1;
                break;
            }
            i += 1;
        }
        node.text = text;
        return node;
    }
    function parserText() {
        const node = new Node(NodeType.TEXT_NODE);
        let text = '';
        while(i < str.length) {
            if (str[i] == '<') {
                back();
                break;
            }
            text += str[i];
            i += 1;
        }
        node.text = text;
        return node;
    }
    function parserElement() {
        const node = new Node(NodeType.ELEMENT_NODE);
        let text = '';
        while(i < str.length) {
            if (str[i] == '<' && str[i + 1] !== '/' && str[i + 1] !== '!') {
                i += 1;
                node.childrens.push(parserElement());
                continue;
            } else if (str[i] == '<' && getNext(1) == '/') {
                while(1) {
                    i += 1;
                    if (str[i] == '>') {
                        break;
                    }
                }
                i += 1;
                break;
            } else if (str[i] == '<' && getNext(1) == '!' && getNext(2) == '-') {
                node.childrens.push(parserComment());
                continue;
            } else if (str[i] == '<' && getNext(1) == '!' && getNext(2) == 'D') {
                node.childrens.push(parserDocument());
                continue;
            } else if (str[i] == '/' && getNext(1) == '>') {
                i += 2;
                node.text = text;
                break;
            }
            if (str[i] == '>') {
                node.text = text;
                text = '';
                if (str[i + 1] !== '<') {
                    next();
                    node.childrens.push(parserText());
                }
            } else {
                text += str[i];
            }
            i += 1;
        }
        return node;
    }

    function parserAttribute(tree) {
        bfs(tree, (node) => {
            if (node.type == NodeType.ELEMENT_NODE) {
                const text = node.text;
                let i = 0;
                let tagName = '';
                if (!text) return;
                while(i < text.length) {
                    const char = text[i];
                    if (char !== " " && !node.tagName) {
                        tagName += text[i];
                    } else if (char == " " && !node.tagName) {
                        node.tagName = tagName;
                        break;
                    }
                    i += 1;
                }
                const kvArr = text.match(kvReg);
                if (kvArr && kvArr.length > 0) {
                    let nv = '';
                    kvArr.forEach(item => {
                        const key = item.split("=")[0];
                        const v = item.split("=")[1];

                        for (let i = 0; i < v.length; i += 1) {
                            if (v[i] == "'" || v[i] == '"') {
                                continue;
                            }
                            nv += v[i];
                        }
                        node.attribute.push({
                            k: key,
                            v: nv
                        });
                    });
                }
            }
        });
    }

    function parser(str) {
        const node = parserElement();
        parserAttribute(node);
        console.log(node);
        return node;
    }

    return parser(str);
}

// 解析ELEMENT_NODE Attribute属性以及TagName

module.exports = { HtmlParser, JsParser, CssParser, bfs }