import Taro from "@tarojs/taro";
import { log } from "@service/logService";

/*
  拦截器名称：关闭全局请求的 loading 动画
*/
const setLoading = result => {
  log("[interceptor.response]setLoading:", result);

  Taro.hideToast();
  return result;
};

export default setLoading;