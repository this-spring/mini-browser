/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-28 22:16:38
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-28 23:59:40
*/
function CssParser(node) {
    const map = new Map();
    let cssStr = '';
    node.childrens.forEach(item => {
        cssStr += item.text;
    });
    console.log(cssStr);
    let state = 0; // 0默认  1标签开始  2标签中
    let i = 0;
    let key = '';
    let attribute = '';

    function parserAttribute() {
        const attributes = [];
        let token = "";
        while(i < cssStr.length) {
            const char = cssStr[i];
            if (char == " " || char == "{" || char == "\n") {
                i += 1;
                continue;
            };
            if (char == '}') {
                state = 0;
                break;
            } else if (char == ":") {
                attribute = token;
                token = '';
            } else if (char == ";") {
                const obj = new Object();
                obj[attribute] = token;
                token = '';
                attributes.push(obj);
            } else {
                token += char;
            }
            i += 1;
        }
        return attributes;
    }

    while(i < cssStr.length) {
        const char = cssStr[i];
        if (state == 0) {
            if (char == " " || char =="\n") {
                i += 1;
                continue;
            };
            state = 1;
        }
        if (state == 1) {
            if (char == " ") {
                const attributes = parserAttribute();
                map.set(key, attributes);
                key = '';
            } else {
                key += char;
            }
        }
        i += 1;
    }
    return map;
}

module.exports = { CssParser }