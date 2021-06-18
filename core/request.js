/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 14:16:06
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-18 18:26:22
*/
const http = require('http');
const { URL } = require('url');
// http://example.org/
// http://local.h5.com/mygithub/mini-browser/html/1.html
// const str = 'http://local.h5.com/mygithub/mini-browser/html/1.html';
// request(str);
class Request {
    req(str) {
       const p = new Promise((ok, no) => {
            const { host, pathname, port } = new URL(str);
            const options = {
                port,
                host,
                method: 'GET',
                path: pathname,
            };
            const req = http.request(options, (res) => {
                res.setEncoding("utf-8");
                res.on("data", (chunk) => {
                    ok(chunk)
                });
                req.on("error", (err) => {
                    no(err)
                });
            });
            req.end();
       });
       return p;
    }
}

module.exports = { Request }