/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-28 22:16:46
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-28 23:45:07
*/
function bfs(root, start) {
    if (!root) return;
    const stack = [];
    stack.push(root);
    while(stack.length > 0) {
        for (let i = 0, len = stack.length; i < len; i += 1) {   
            const item = stack.shift();         
            for (let j = 0, lenn = item.childrens.length; j < lenn; j += 1) {
                stack.push(item.childrens[j]);
            }
            start(item);
        }
    }
}

module.exports = { bfs }