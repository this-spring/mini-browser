/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-28 22:16:32
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-28 22:17:40
*/
function JsParser(node) {
    let scriptStr = '';
    node.childrens.forEach(item => {
        scriptStr += item.text;
    });
    eval(scriptStr)
}

module.exports = { JsParser }