> 原文地址：[基于 Vue 配置 axios](https://juejin.im/post/5a02a898f265da43052e0c85)
> 项目源码：[点击打开](https://github.com/NoManReady/Tide/blob/master/src/utils/fetch.js)

### 1、背景
- 在项目开发中ajax请求是必不可缺少  
- 一部分ajax请求不需要loading或请求时间少于多少是不显示loading  
-  项目中对请求的同一化处理（错误处理，返回数据格式化处理，loading处理，token处理）  
-  配置基于个人vue项目进行配置，已加载vux相关组件，会进行一些依赖的import（可以按需配置）  

```
import Vue from 'vue'
import axios from 'axios'
//项目的一些环境配置参数，读取host
import config from '@/config'
//vuex状态管理，这里主要进行对全局loading的控制
import store from '@/store'
//vue-router对相应状态码的页面操作（router实例）
import router from '@/router'
//console对应封装
import { log } from '@/utils'
```
### 2、解决方案
对于axios的封装中我们定义几个参数进行声明  
```
// 加载最小时间
const MINI_TIME = 300
// 超时时间（超时时间）
let TIME_OUT_MAX = 5000
// 环境value
let _env = process.env.NODE_ENV
// 请求接口host
let _apiHost = config.api
// 请求组（判断当前请求数）
let _requests = []
```
一般一个项目中的根host和Content-Type都是统一的，这里对axios进行统一的配置（如果这个后端需要formData格式的表单即content-type='application/x-www-form-urlencoded;charset=utf-8'数据，需要对请求数据进行表单序列化，比较快的方式就是引入qs库qs.stringify进行处理后传输）   
```
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = _apiHost
```
一般情况下项目中同一时刻都会有不止一个请求在进行（还没有返回），要判断当前是否还存在进行中的ajax，就需要对_requests这个数组进行维护；
```
/**
 * 添加请求，显示loading
 * @param {请求配置} config 
 */
function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  store.dispatch('loading')
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config 
 */
function popRequest(config) {
  log(`${config.url}--end`)
  let _index = _requests.findIndex(r => {
    return r === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
  if (!_requests.length) {
    Vue.$vux.loading.hide(0)
    store.dispatch('loading', false)
  }
}
```
接下来对axios基于上面的准备进行处理
```
/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (url, data = {}, isSilence = false, method = 'POST') => {
  let _opts = { method, url }
  //通用数据的合并（token）
  let _data = Object.assign({}, data, { token: store.getters.token })
  const _query = {}
  for (let _key in _data) {
    if (_data.hasOwnProperty(_key) && _data[_key] !== '') {
      _query[_key] = _data[_key]
    }
  }
  //axios实例请求定时器ID
  let _timer = null
  //判断请求类型
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = _query
  } else {
    _opts.params = _query
  }
  //返回一个promise
  return new Promise((resolve, reject) => {
    //实例化axios
    const _instance = axios.create({
      timeout: TIME_OUT_MAX
    })
    //定义请求的唯一标识
    let _random = { stamp: Date.now(), url: `${_apiHost + url}` }
    //判断是否静默（静默的话就不加入请求标识队列，不是则申明此请求实例的定时器）
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random)
      }, MINI_TIME)
    }
    //axios实例发送当前请求
    //请求完成：1、取消当前请求的定时器；2、在当前请求标识队列中移除当前标识；
    3、成功的话返回统一处理后的数据，失败则对状态码进行判断
    _instance(_opts)
      .then(res => {
        let responseData = res.data
        clearTimeout(_timer)
        popRequest(_random)
        resolve(res.data)
      })
      .catch(res => {
        let _response = res.response
        let _message = null
        clearTimeout(_timer)
        popRequest(_random)
        switch (_response.status) {
          case 404:
            _message = '404,错误请求'
            break
          case 401:
            router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
            _message = '未授权'
            break
          case 403:
            _message = '禁止访问'
            break
          case 408:
            _message = '请求超时'
            break
          case 500:
            _message = '服务器内部错误'
            break
          case 501:
            _message = '功能未实现'
            break
          case 503:
            _message = '服务不可用'
            break
          case 504:
            _message = '网关错误'
            break
          default:
            _message = '未知错误'
        }
        if (!isSilence) {
          Vue.$vux.toast.show({
            text: _response.data && _response.data.error ? _response.data.error : _message,
            type: 'warn',
            width: '10em'
          })
        }
        reject(res)
      })
  })
}

```