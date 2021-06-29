/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-29 18:18:32
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-29 22:57:06
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
 
const server = http.createServer(function(req, res){
	const pathObject = url.parse(req.url, true);
	const pathname = pathObject.pathname;
    let str = '';
    console.log(pathname);
    if (pathname.indexOf(".html") >= 0
        || pathname.indexOf(".js") >= 0
        || pathname.indexOf(".css") >= 0) {
        str = fs.readFileSync(`./public${pathname}`, {
            encoding: 'utf-8'
        });
        res.write(str);
        res.end();
    } else{
        res.writeHead(404, 'file not found');
        res.end('<h1>404</h1>');
    }
});
console.log(` > start port must is 80`);
server.listen(80);