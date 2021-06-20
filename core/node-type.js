/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2021-06-18 22:51:12
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2021-06-19 13:10:05
*/
const NodeType = {
    TOP: 'TOP',
    ELEMENT_NODE: 'ELEMENT_NODE', // <p></p>
    TEXT_NODE: 'TEXT_NODE', // this is text
    COMMENT_NODE: 'COMMENT_NODE', //     <!--  --> html或css注释
    DOCUMENT_NODE: 'DOCUMENT_NODE', // <!DOCTYPE html>
}

class Node {
    // type 为 NodeType类型
    constructor(type) {
        this.type = type;
        this.childrens = [];
        this.attribute = [];
        this.attributetext = '';
        this.tagName = '';
        this.text = '';
    }
}

module.exports = { NodeType, Node }