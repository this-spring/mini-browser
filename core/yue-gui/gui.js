/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-29 23:47:04
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-30 22:46:08
 */
const gui = require('gui');
const { b, bfs } = require('../main.js');
const width = 800;
const height = 800;
const win = gui.Window.create({})
win.setContentSize({width: width, height: height})
win.setBackgroundColor("#808080");
win.onClose = () => gui.MessageLoop.quit()

// 创建label
const contentView = gui.Container.create()

function makeDiv(text, color, bgcolor) {
  let label = gui.Label.create(text);
  color && label.setStyle({
    color: color
  });
  bgcolor && label.setBackgroundColor(bgcolor);
  label.setAlign("start");
  return label;
}

win.setContentView(contentView);
win.activate();

// Browser部分
(async () => {
  await b.run();
  bfs(b.renderTree, (node) => {
    console.log(node.tagName);
    let color = '';
    let bgcolor = '';
    // TEXT_NODE
    if (node.type == 'ELEMENT_NODE') {
      // 获取颜色属性
      if (node.renderAttribute.color) {
        color = node.renderAttribute.color;
      }
      if (node.renderAttribute['background-color']) {
        bgcolor = node.renderAttribute['background-color'];
      }
      // 要渲染的文字
      let str = '';
      for (let i = 0; i < node.childrens.length; i += 1) {
        const item = node.childrens[i];
        if (item.type == 'TEXT_NODE') {
          str += item.text;
        }
      }
      if (!str) return;
      console.log(str, color, bgcolor);
      contentView.addChildView(makeDiv(str, color, bgcolor));
    }
  });
  if (!process.versions.yode) {
    gui.MessageLoop.run()
    process.exit(0)
  }
})();

// setTimeout(() => {
//   b.run();
// }, 0);


