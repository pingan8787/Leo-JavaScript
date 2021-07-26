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

const setError = error => {

}

export default {
  success: setLoading,
  error: setError
};