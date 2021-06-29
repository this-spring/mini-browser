/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 14:16:06
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 22:05:49
*/
const http = require('http');
const https = require('https');
const { URL } = require('url');
// const str = 'http://local.h5.com/mygithub/mini-browser/serve/public/index.html';
// const str = 'http://127.0.0.1:80/index.html';

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
                    console.log(chunk);
                    ok(chunk)
                });
                req.on("error", (err) => {
                    console.error(err);
                    no(err)
                });
            });
            req.end();
       });
       return p;
    }
}
module.exports = { Request }