"use strict";
// class Compile {
//     // 本文不具体介绍如何实现，本文主要介绍响应式原理
//     // Compile 类的代码地址：
// }


// 初始化测试数据
const vm = new Vue({
    el: '#app',
    data(){
        return {
            text: '你好，前端自习课',
            desc: '每日清晨，享受一篇前端优秀文章。'
        }
    },
    methods: {

    }
});

console.log(vm.$data.text)
vm.$data.text = '我们必须经常保持旧的记忆和新的希望。';
console.log(vm.$data.text)