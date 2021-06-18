/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 14:15:56
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-18 18:26:40
*/
const { Request } = require('./request');
const str = 'http://local.h5.com/mygithub/mini-browser/html/1.html';
class Browser {
    constructor() {
        this.request = new Request();
    }
    async run() {
        const request = this.request.req;
        const res = await request(str);
        console.log("html:", res);
        
    }
}
const b = new Browser();
b.run();
