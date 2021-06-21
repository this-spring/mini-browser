/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-21 00:51:15
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-21 01:02:49
 */
const reg = /[^ ]*=[^ ]*/g;
const str = 'div class="p" id="z"';
console.log(str.match(reg));