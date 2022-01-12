> 本文思路来自实际项目的重构总结，欢迎纠正和交流。

最近重构一个老项目，发现其中处理请求的拦截器写得相当乱，于是我将整个项目的请求处理层重构了，目前已经在项目中正常运行。

本文会和大家分享我的重构思路和后续优化的思考，为方便与大家分享，我用 Vue3 实现一个简单 demo，思路是一致的，有兴趣的朋友可以[在我 Github 查看](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Summary/useful-request-demo/index.html)，本文会以这个 Vue 实现的 demo 为例介绍。

本文我会主要和大家分享以下几点：

1. 问题分析和方案设计；
2. 重构后效果；
3. 开发过程；
4. 后期优化点；

如果你还不清楚什么是 HTTP 请求和响应拦截器，那么可以先看看[《77.9K Star 的 Axios 项目有哪些值得借鉴的地方》](https://juejin.cn/post/6885471967714115597) 。

## 一、需求思考和方案设计

### 1. 问题分析

目前旧项目经过多位同事参与开发，拦截器存在以下问题：

- 代码比较混乱，可读性差；
- 每个拦截器职责混乱，存在相互依赖；
- 逻辑上存在问题；
- 团队内部不同项目无法复用；

### 2. 方案设计

分析上面问题后，我初步的方案如下：
参考**插件化架构设计**，**独立每个拦截器**，将每个拦截器抽离成单独文件维护，做到**职责单一**，然后通过**拦截器调度器**进行调度和注册。

其拦截器调度过程如下图：
![拦截器调度过程](https://images.pingan8787.com/image/http-interceptors/registe.png)

## 二、重构后效果

代码其实比较简单，这里先看下最后实现效果：

### 1. 目录分层更加清晰

重构后请求处理层的目录分层更加清晰，大致如下：

![目录分层](https://images.pingan8787.com/image/http-interceptors/directory.png)

### 2. 拦截器开发更加方便

在后续业务拓展新的拦截器，仅需 3 个步骤既可以完成拦截器的开发和使用，拦截器调度器会**自动调用所有拦截器**：

![拦截器开发更加方便](https://images.pingan8787.com/image/http-interceptors/develop.png)

### 3. 每个拦截器职责更加单一，可插拔

将每个拦截器抽成一个文件去实现，让每个拦截器**职责分离且单一**，当不需要使用某个拦截器时，随时可以替换，灵活插拔。


## 三、开发过程

这里以我单独抽出来的[这个 demo 项目](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Summary/useful-request-demo/index.html)为例来介绍。

### 1. 初始化目录结构

按照前面设计的方案，首先需要在项目中创建一下目录结构：

```bash
- request
	- index.js      // 拦截器调度器
  - interceptors  
    - request     // 用来存放每个请求拦截器
    	- index.js  // 管理所有请求拦截器，并做排序
    - response    // 用来存放每个响应拦截器
    	- index.js  // 管理所有响应拦截器，并做排序
```


### 2. 定义拦截器调度器

因为项目采用 [axios 请求库](https://github.com/axios/axios)，所以我们需要先知道 axios 拦截器的使用方法，这里简单看下 [axios 文档上如何使用拦截器](https://github.com/axios/axios#interceptors)的：

```javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 业务 逻辑
    return config;
  }, function (error) {
    // 业务 逻辑
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 业务 逻辑
    return response;
  }, function (error) {
    // 业务逻辑
    return Promise.reject(error);
  });
```

从上面代码，我们可以知道，使用拦截器的时候，只需调用 `axios.interceptors` 对象上对应方法即可，因此我们可以将这块逻辑抽取出来：

```javascript
// src/request/interceptors/index.js
import { log } from '../log';
import request from './request/index';
import response from './response/index';

export const runInterceptors = instance => {
    log('[runInterceptors]', instance);
  	if(!instance) return;

    // 设置请求拦截器
    for (const key in request) {
        instance.interceptors.request
            .use(config => request[key](config));
    }

    // 设置响应拦截器
    for (const key in response) {
        instance.interceptors.response
            .use(result => response[key](result));
    }

    return instance;
}
```

这就是我们的**核心拦截器调度器**，目前实现导入所有请求拦截器和响应拦截器后，通过 `for` 循环，注册所有拦截器，最后将整个 axios 实例返回出去。


### 3. 定义简单的请求拦截器和响应拦截器

这里我们做简单演示，创建以下两个拦截器：

1. 请求拦截器：**setLoading**，作用是在发起请求前，显示一个全局 Toast 框，提示“加载中...”文案。
2. 响应拦截器：**setLoading**，作用是在请求响应后，关闭页面中的 Toast 框。

为了统一开发规范，我们约定插件开发规范如下：

```javascript
/*
  拦截器名称：xxx
*/
const interceptorName = options => {
  log("[interceptor.request]interceptorName:", options);
	// 拦截器业务
  return options;
};

export default interceptorName;
```

首先创建文件 `src/request/interceptors/request/` 目录下创建 `setLoading.js`  文件，按照上面约定的插件开发规范，我们完成下面插件开发：

```javascript
// src/request/interceptors/request/setLoading.js

import { Toast } from 'vant';
import { log } from "../../log";

/*
  拦截器名称：全局设置请求的 loading 动画
*/
const setLoading = options => {
  log("[interceptor.request]setLoading:", options);

  Toast.loading({
    duration: 0,
    message: '加载中...',
    forbidClick: true,
  });
  return options;
};

export default setLoading;
```

然后在导出该请求拦截器，并且导出的是个**数组**，方便拦截器调度器进行统一注册：

```javascript
// src/request/interceptors/request/index.js

import setLoading from './setLoading';

export default [
    setLoading
];
```

按照相同方式，我们开发响应拦截器：

```javascript
// src/request/interceptors/response/setLoading.js

import { Toast } from 'vant';
import { log } from "../../log";

/*
  拦截器名称：关闭全局请求的 loading 动画
*/
const setLoading = result => {
  log("[interceptor.response]setLoading:", result);

  // example: 请求返回成功时，关闭所有 toast 框
  if(result && result.success){
    Toast.clear();
  }
  return result;
};

export default setLoading;
```

导出响应拦截器：

```javascript
// src/request/interceptors/response/index.js

import setLoading from './setLoading';
export default [
    setLoading
];
```

### 4. 全局设置 axios 拦截器

按照前面相同步骤，我又多写了几个拦截器：
请求拦截器：

- setSecurityInformation.js：为请求的 url 添加安全参数；
- setSignature.js：为请求的请求头添加加签信息；
- setToken.js： 为请求的请求头添加 token 信息；

响应拦截器：

- setError.js：处理响应结果的出错情况，如关闭所有 toast 框；
- setInvalid.js：处理响应结果的登录失效情况，如跳转到登录页；
- setResult.js：处理响应结果的数据嵌套太深的问题，将 `result.data.data.data` 这类返回结果处理成 `result.data` 格式；

至于是如何实现的，大家有兴趣可以[在我 Github 查看](https://github.com/pingan8787/Leo-JavaScript/blob/master/Cute-Summary/useful-request-demo/index.html)。

然后我们可以将 axios 进行二次封装，导出 `request` 对象供业务使用：

```javascript
// src/request/index.js

import axios from 'axios';
import { runInterceptors } from './interceptors/index';
export const requestConfig = { timeout: 10000 };

let request = axios.create(requestConfig);
request = runInterceptors(request);

export default request;
```

到这边就完成。

在业务中需要发起请求，可以这么使用：

```vue
<template>
  <div><button @click="send">发起请求</button></div>
</template>

<script setup>
import request from './../request/index.js';

const send = async () => {
  const result = await request({
    url: 'https://httpbin.org/headers',
    method: 'get'
  })
}
</script>
```

### 5. 测试一下

开发到这边就差不多，我们发送个请求，可以看到所有拦截器执行过程如下：

![日志输出](https://images.pingan8787.com/image/http-interceptors/console.png)

看看请求头信息：

![请求头](https://images.pingan8787.com/image/http-interceptors/headers.png)

可以看到我们开发的请求拦截器已经生效。

## 四、Taro 中使用
由于 [Taro](https://taro-docs.jd.com/) 中已经提供了 [Taro.request](https://taro-docs.jd.com/taro/docs/2.x/apis/network/request/request) 方法作为请求方法，我们可以不需要使用 axios 发请求。

基于上面代码进行改造，也很简单，只需要更改 2 个地方：
### 1. 修改封装请求的方法

主要是更换 axios 为 Taro.request 方法，并使用 addInterceptor  方法导入拦截器：

```js
// src/request/index.js

import Taro from "@tarojs/taro";
import { runInterceptors } from './interceptors/index';

Taro.addInterceptor(runInterceptors);

export const request = Taro.request;
export const requestTask = Taro.RequestTask; // 看需求，是否需要
export const addInterceptor = Taro.addInterceptor; // 看需求，是否需要
```

### 2. 修改拦截器调度器
由于 axios 和 `Taro.request` 添加拦截器的方法不同，所以也需要进行更换：

```js
import request from './interceptors/request';
import response from './interceptors/response';

export const interceptor = {
    request,
    response
};

export const getInterceptor = (chain = {}) => {
  // 设置请求拦截器
  let requestParams = chain.requestParams;
  for (const key in request) {
    requestParams = request[key](requestParams);
  }

  // 设置响应拦截器
  let responseObject = chain.proceed(requestParams);
  for (const key in response) {
    responseObject = responseObject.then(res => response[key](res));
  }
  return responseObject;
};
```
具体 API 可以看 [Taro.request](https://taro-docs.jd.com/taro/docs/2.x/apis/network/request/request) 文档，这里不过多介绍。
## 五、项目总结和思考

这次重构主要是按照已有业务进行重构，因此即使是重构后的请求层，仍然还有很多可以优化的点，目前我想到有这些，也算是我的一个 TODO LIST 了：

### 1. 将请求层独立成库

由于公司现在独立站点的项目较多，考虑到项目的统一开发规范，可以考虑将该请求层独立为私有库进行维护。
目前思路：

- 参考插件化架构设计，通过 [lerna](https://github.com/lerna/lerna/) 做管理所有拦截器；
- 升级 TypeScript，方便管理和开发；
- 进行工程化改造，加入构建工具、单元测试、UMD等等；
- 使用文档和开发文档完善。

### 2.  支持可更换请求库

单独抽这一点来讲，是因为目前我们前端团队使用的请求库较多，比较分散，所以考虑到通用性，需要增加支持可更换请求库方法。
目前思路：

- 在已有请求层再抽象一层**请求库适配层**，定义统一接口；
- 内置几种常见请求库的适配。


### 3. 开发拦截器脚手架

这个的目的其实很简单，让团队内其他人直接使用脚手架工具，按照内置脚手架模版，快速创建一个拦截器，进行后续开发，很大程度统一拦截器的开发规范。
目前思路：

- 内置两套拦截器模版：请求拦截器和响应拦截器；
- 脚手架开发比较简单，参数（如语言）根据业务需要再确定。

### 4. 增强拦截器调度

目前实现的这个功能还比较简单，还是得考虑增强拦截器调度。
目前思路：

- 处理拦截器失败的情况；
- 处理拦截器调度顺序的问题；
- 拦截器同步执行、异步执行、并发执行、循环执行等等情况；
- 可插拔的拦截器调度；
- 考虑参考 Tapable 插件机制；

## 六、本文总结

本文通过一次简单的项目重构总结出一个请求层拦截器调度方案，目的是为了实现所有**拦截器职责单一**、方便维护，并**统一维护**和**自动调度**，大大降低实际业务的拦截器开发上手难度。

后续我仍有很多需要优化的地方，作为自己的一个 TODO LIST，如果是做成完全通用，则定位可能更偏向于拦截器调度容器，只提供一些通用拦截器，其余还是由开发者定义，库负责调度，但常用的请求库一般都已经做好，所以这样做的价值有待权衡。

当然，目前还是优先作为团队内部私有库进行开发和使用，因为基本上团队内部使用的业务都差不多，只是项目不同。