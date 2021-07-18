import { Toast } from 'vant';
import { log } from "../../log";

/*
  拦截器名称：处理全局请求的失败情况
  拦截器说明：如跳转登录页，失效页，清理缓存等操作。
*/
const setError = result => {
  log("[interceptor.response]setError:", result);
  
  // example: 请求返回失败时，提示返回结果里面的错误信息
  if(result && !result.success){
    const message = result && result.message;

    Toast.loading({
      message: '请求失败，错误信息：' + message,
      forbidClick: true,
    });
  }
  return result;
};

export default setError;