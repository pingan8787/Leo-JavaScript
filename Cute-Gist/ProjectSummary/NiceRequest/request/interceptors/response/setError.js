import Taro from "@tarojs/taro";
import { log } from "@service/logService";

/*
  拦截器名称：处理全局请求的失败情况
  拦截器说明：如跳转登录页，失效页，清理缓存等操作。
*/
const setError = result => {
  log("[interceptor.response]setError:", result);
  
  if(!result || (result && !result.success)){
    const message = (result && (result.msg || result.Message)) || (result.body && result.body.msg);

    message && Taro.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    })
  }
  return result;
};

export default setError;