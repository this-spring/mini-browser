/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-22 22:18:42
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 22:49:43
 */
const uname = 'xxq';
const uage = '18';
console.log(` name:${uname}  age:${uage}`);
setTimeout(() => {
    console.log("before > ", document.querySelector('#test').innerHTML);
    document.querySelector('#test').innerHTML = 'after change';
    console.log("after > ", document.querySelector('#test').innerHTML);
}, 2000);