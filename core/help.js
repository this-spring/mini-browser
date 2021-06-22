/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-22 23:08:49
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-22 23:10:30
*/
function sleep(time) {
    const p = new Promise((ok, no) => {
        setTimeout(() => {
            ok();
        }, time);
    });
    return p;
}

export { sleep }