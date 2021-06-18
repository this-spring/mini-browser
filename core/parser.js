/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 18:27:17
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-18 23:30:32
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
function HtmlParser(str) {
    const node = new Node();
    let i = -1;
    const getChar = () => str[++i];
    const getNext = () => str[i + 1];
    const getLast = () => str[i - 1];
    function parser(str, start, end) {
        while(i <= str.length) {
            const char = getChar();
            switch() {
                case :
                    
            }
        }
    }

    parser(str, () => {
        // start

    }, () => {
        // end
        
    });
}

HtmlParser(str);
module.exports = { HtmlParser, JsParser, CssParser }