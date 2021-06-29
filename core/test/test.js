/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-21 00:51:15
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 14:24:45
 */
// const reg = /[^ ]*=[^ ]*/g;
// const str = 'div class="p" id="z"';
// console.log(str.match(reg));
const reg = /(^\s+)|(^\n+$)/ig;
const t1 = '   ';
const t2= `

`;
const t3 = ' fsdfa  ';
const t4 = `
123
345  566

`;
console.log(reg.test(t1));
console.log(reg.test(t2));
console.log(reg.test(t3));
console.log(reg.test(t4));

console.log(t1.trim() == '');
console.log(t2.trim() == '');
console.log(t3.trim() == '');
console.log(t4.trim() == '');


