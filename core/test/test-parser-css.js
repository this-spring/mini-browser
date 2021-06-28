/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-28 23:17:32
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-28 23:17:52
 */
const { cssParser } = require('../css-parser.js');


const css = `
h1 {
    color: white;
}

div {
    color: red;
}

p {
    color: blue;
    background-color: black;
}

.class {
    background-color: black;
}`;
console.log(cssParser(css));