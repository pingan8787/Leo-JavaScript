## 简介

`InAppBrowser` 调用 `Cordova` 插件的流程和 `Ionic Native `的核心


## 一、流程简介

`InAppBrowser` 调用 `Cordova` 插件的流程共分为 9 个步骤：

1. 前端进入页面，加载 JSSDK（`jexe.js`），调用 `exe.app.js` 部分，并判断平台（ iOS / Android ）；

2. 动态加载对应平台的 `Cordova.js` 及 `Cordova` 插件；

3. 用户触发请求事件， 前端携带 `Command` 参数调用 `Cordova` 插件；

4. 前端与原生端通信（如 iOS 端使用 `postMessage`）；

5. 原生端接收并解析前端传入的 `Command` 参数，调用对应 `Cordova` 插件，将插件和主 `WebView` 绑定，将返回调用结果传入主 `WebView` 的 `Cordova` 插件；

6. 主 `WebView` 中调用 `callbackFromNative`；

7. 执行 `callbackFromNative` 中的 `else` 语句；

8. 将主 `WebView` 中调用结果返回回传，调用 `InAppBrowser` 中 `callbackFromNative` 方法；

9. 调用响应回调函数，返回调用结果给前端；

## 二、流程分析

本文以使用 `ImagePicker` 插件为例，介绍整个从 `InAppBrowser` 调用 `Cordova` 插件的流程。

### 1. 前端页面加载 JSSDK

### 2. 动态添加不同平台 Cordova 及插件

### 3. 用户触发请求，前端调用插件

### 4. 与原生端通信

### 5. 解析参数和插件绑定

### 6. 调起原生层 Cordova 插件

### 7. 执行前端传入的回调

### 8. 回传调用结果

### 9. 前端调用回调函数