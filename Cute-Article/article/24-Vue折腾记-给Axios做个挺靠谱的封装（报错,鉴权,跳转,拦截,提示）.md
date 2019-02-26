> 阅读原文 [Vue 折腾记 - (10) 给axios做个挺靠谱的封装(报错,鉴权,跳转,拦截,提示)](https://juejin.im/post/59a22e71518825242c422604)

# 前言
不推荐完全copy过去,可以看看我是如何针对我这边业务，做的一个axios的封装及实现的思路。  

# 需求及实现
* 统一捕获接口报错
* 弹窗提示
* 报错重定向
* 基础鉴权
* 表单序列化

# 实现功能
* 统一捕获接口报错 : 用的axios内置的拦截器
* 弹窗提示: 引入 `Element UI`的`Message`组件
* 报错重定向: 路由钩子
* 基础鉴权: 服务端过期时间戳和token,还有借助路由的钩子
* 表单序列化: 我这边直接用qs(npm模块),你有时间也可以自己写

# 效果图
坑都已经爬过,现在复现那些错误有点麻烦..所以没法录制动态图。  

# 用法及封装
* 用法
```js
// 服务层 , import默认会找该目录下index.js的文件,这个可能有小伙伴不知道
// 可以去了解npm的引入和es6引入的理论概念
import axiosPlugin from "./server"; 
Vue.use(axiosPlugin);
```

* 对axios的封装(AXIOS:index.js)
```js
import axios from "axios";
import qs from "qs";
import { Message } from "element-ui";
import router from "../router";

const Axios = axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (res.data && !res.data.success) {
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: res.data.error.message.message
          ? res.data.error.message.message
          : res.data.error.message,
        type: "error"
      });
      return Promise.reject(res.data.error.message);
    }
    return res;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem("loginUserBaseInfo")) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: "/login"
      });
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      console.log(nowTime, lifeTime);
      console.log(nowTime > lifeTime);
      if (nowTime > lifeTime) {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        router.push({
          path: "/login"
        });
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 403) {
          router.push({
            path: "/error/403"
          });
        }
        if (error.response.status === 500) {
          router.push({
            path: "/error/500"
          });
        }
        if (error.response.status === 502) {
          router.push({
            path: "/error/502"
          });
        }
        if (error.response.status === 404) {
          router.push({
            path: "/error/404"
          });
        }
      }
    }
    // 返回 response 里的错误信息
    let errorInfo =  error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function(Vue, Option) {
    Object.defineProperty(Vue.prototype, "$http", { value: Axios });
  }
};
```

* 路由钩子的调整(Router:index.js)
```js
import Vue from "vue";
import Router from "vue-router";
import layout from "@/components/layout/layout";
// 版块有点多,版块独立路由管理,里面都是懒加载引入
import customerManage from "./customerManage"; // 客户管理
import account from "./account"; //登录
import adManage from "./adManage"; // 广告管理
import dataStat from "./dataStat"; // 数据统计
import logger from "./logger"; // 日志
import manager from "./manager"; // 管理者
import putonManage from "./putonManage"; // 投放管理
import error from "./error"; // 服务端错误
import { Message } from "element-ui";

Vue.use(Router);

// 请跳过这一段,看下面的
const router = new Router({
  hashbang: false,
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/adver",
      component: layout,
      children: [
        ...customerManage,
        ...adManage,
        ...dataStat,
        ...putonManage,
        ...manager,
        ...logger
      ]
    },
    ...account,
    ...error
  ]
});

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem("loginUserBaseInfo")) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = (new Date()).getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next();
      } else {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        next({
          path: "/login"
        });
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
```
axios可配置的一些选项,其他的具体看官网说明哈。  
```js
export default {
  // 请求地址
  url: "/user",
  // 请求类型
  method: "get",
  // 请根路径
  baseURL: "http://www.mt.com/api",
  // 请求前的数据处理
  transformRequest: [function(data) {}],
  // 请求后的数据处理
  transformResponse: [function(data) {}],
  // 自定义的请求头
  headers: { "x-Requested-With": "XMLHttpRequest" },
  // URL查询对象
  params: { id: 12 },
  // 查询对象序列化函数
  paramsSerializer: function(params) {},
  // request body
  data: { key: "aa" },
  // 超时设置s
  timeout: 1000,
  // 跨域是否带Token
  withCredentials: false,
  // 自定义请求处理
  adapter: function(resolve, reject, config) {},
  // 身份验证信息
  auth: { uname: "", pwd: "12" },
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: "json",
  // xsrf 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  // 下传和下载进度回调
  onUploadProgress: function(progressEvent) {
    Math.round(progressEvent.loaded * 100 / progressEvent.total);
  },
  onDownloadProgress: function(progressEvent) {},

  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
  // 用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 用于设置跨域请求代理
  proxy: {
    host: "127.0.0.1",
    port: 8080,
    auth: {
      username: "aa",
      password: "2123"
    }
  },
  // 用于取消请求
  cancelToken: new CancelToken(function(cancel) {})
};
```


# 总结 
我这个封装虽说不是万金油版本,但是我感觉大多用axios结合vue的小伙伴,稍微改改都能直接拿来用~~~哟吼吼,哟吼吼.....
