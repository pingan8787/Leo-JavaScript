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

const setLoading = error => {

}

export default {
  success: setInvalid,
  error: setError
};