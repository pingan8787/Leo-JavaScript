/**
 * 学习文章：https://mp.weixin.qq.com/s/ZMLf0znRMaeBMc5n-DgoXQ
 */

// importScript.js
export default function (url, _) {
    const defineTemp = window.define; // 将 window 下的 define 方法暂存起来。
    let result; // 结果
    window.define = (depends, func) => { // 自定义 define 方法，
        result = func(_); // 包依赖注入 
    }
    window.define.amd = true; // 伪装成 amd 的 define。
    return new Promise(function (resolve, reject) {
        const el = document.createElement('script'); // 创建 script 元素
        el.src = url;
        el.async = false; // 保持时序
        const loadCallback = function () { // 加载完成之后处理
            el.removeEventListener('load', loadCallback);
            window.define = defineTemp;
            resolve(result);
        };
        const errorCallback = function (evt) { // 加载失败之后处理
            el.removeEventListener('error', errorCallback);
            window.define = defineTemp;
            var error = evt.error || new Error("Load javascript failed. src=" + url);
            reject(error);
        };
        el.addEventListener('load', loadCallback); // 绑定事件
        el.addEventListener('error', errorCallback); // 绑定事件
        document.body.appendChild(el); // 插入元素
    });
}


// main.js
import importScript from './importScript.js';
import _ from 'lodash';
importScript('http://static.cai-inc.com/app.bundle.js', _).then((mod) => {
    // code mod.xxx
})