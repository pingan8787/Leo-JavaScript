import { log } from "../../log";

/*
  拦截器名称：处理全局请求的登录状态失效场景
*/
const setInvalid = result => {
  log("[interceptor.response]setInvalid:", result);

  if(result && !result.success && result.code === 401){
    // 跳转 401 页面，或者登录页
  }
  return result;
};

const setFail = error => {

}

export default {
  success: setInvalid,
  error: setError
};