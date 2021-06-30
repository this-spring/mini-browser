<!--
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-06 23:59:56
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-07-01 00:08:05
-->
# mini-browser
make a mini browser

## run mini browser
run server(Under this directory(server/public/), we usually write HTML, CSS and JS directories):  

```
cd server
npm install
node server.js  
```

run browser
```
cd core
npm install
cd yue-gui
node gui.js
```

# book
all md

# core

mini broser source code.

Workflow  
```
// 1. req html
this.html = await request(str);
console.log('finish html');
// 2. parser html
this.tree = await this.parserHtml();
// 3. jsparer runtime cssparser
this.parserJSCSS();
// 4. make render tree
this.renderTree = this.makeRenderTree(this.tree);
// 5. css to renderTree
this.cssToRenderTree();
// 6. gui render content
```

Browser implemented by myself.   
Node provides the js runtime.   
OpenGL provides GUI rendering.  
Parser implemented by Node.  

# html  
test source by myself

# src
refer other implemented browser  

# test-html
other test source  


# Source
- https://browser.engineering/index.html

- https://github.com/danfragoso/thdwb  

- https://github.com/QuarkGluonPlasma/tiny-browser