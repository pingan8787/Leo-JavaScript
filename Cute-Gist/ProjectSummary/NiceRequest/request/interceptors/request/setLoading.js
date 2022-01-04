import Taro from "@tarojs/taro";
import { log } from "@service/logService";

/*
  拦截器名称：全局设置请求的 loading 动画
*/
const setLoading = options => {
  log("[interceptor.request]setLoading:", options);

  Taro.showToast({
    title: '加载中',
    icon: 'loading',
    mask: true,
    duration: 9999999
  })
  return options;
};

export default setLoading;