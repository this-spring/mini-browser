/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 18:27:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-20 20:04:10
*/
const { Node, NodeType } = require('./node-type'); 
function JsParser(str) {
    
}

function CssParser(str) {
    
}
const str = `<!--
* @Author: xiuquanxu
* @Company: kaochong
* @Date: 2021-06-18 17:17:59
* @LastEditors: xiuquanxu
* @LastEditTime: 2021-06-18 17:18:17
-->
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>
<body>
   <h1>this is mini browser</h1>
</body>
</html>`;

const testComment = `<!--
* @Author: xiuquanxu
* @Company: kaochong
* @Date: 2021-06-18 17:17:59
* @LastEditors: xiuquanxu
* @LastEditTime: 2021-06-18 17:18:17
-->`;

const testDocument = `<!DOCTYPE html>`;

const testElement = `<div class="p">this is p<div><spa>123</spa></div></div>`;


function HtmlParser(str) {
    const node = new Node(NodeType.TOP);
    let i = -1;
    let token = '';
    const seek = (num) => i += num;
    const back = () => i --;
    const next = () => i ++;
    const deleteTokenLastLetter = (num) => token.substring(0, token.length - num);
    const getChar = () => {
        i += 1;
        return str[i];
    };
    const getNext = (num) => str[i + num];
    const getLast = (num) => str[i - num];
    const startTagReg = /[<(<!)]/;
    function parserDocument() {
        const node = new Node(NodeType.DOCUMENT_NODE);
        let text = '';
        while (i < str.length) {
            text += str[i];
            if (i == '>') break;
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
            if (i == '>') break;
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
            if (str[i] == '<' && str[i + 1] !== '/') {
                i += 1;
                node.childrens.push(parserElement());
                continue;
            } else if (str[i] == '<' && getNext(1) == '/') {
                seek(6);
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
    function parser(str, start, end) {
        let state = 0;
        let parentNode = node;
        while(i < str.length) {
            const char = getChar();
            if (char == '<') {
                if (getNext(1) == '!') {
                    //<!
                    const node = getNext(2) == 'D' ? parserDocument() : parserComment();
                    console.log(node);
                } else {
                    // next();
                    const node = parserElement(parentNode);
                    console.log(node);
                    break;
                }
            }
        }
    }

    parser(str, (node, parent) => {
        // start
        parent.childrens.push(node);
    }, () => {
        // end
        
    });
}

HtmlParser(testElement);
module.exports = { HtmlParser, JsParser, CssParser }