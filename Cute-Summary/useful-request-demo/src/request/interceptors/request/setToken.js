import { log } from "../../log";
import { getToken } from "../../utils";
/*
  拦截器名称：全局设置请求的 token 内容
*/
const setToken = options => {
  log("[interceptor.request]setToken:", options);

  if(!options.headers){
    options.headers = {};
  }
  // 考虑部分接口不需要使用 token，如用户登录接口（因为还没登录，没有 token）
  if (!options.noSignature){
    options.headers['token'] = getToken();
  }
  return options;
};

const setError = error => {

}

export default {
  success: setToken,
  error: setError
};