import { log } from "../../log";
import { aesEncrypt } from "../../utils";

/*
  拦截器名称：全局设置请求的 url 安全信息
  拦截器说明：在 url 后面添加查询参数 __u __v 等参数
*/
const setSecurityInformation = options => {
  log("[interceptor.request]setSecurityInformation:", options);
  
  
  if(options.url) {
    // example: 根据时间戳和浏览器 UA 添加
    const __u = new Date().getTime();
    const __e = navigator.userAgent;
    const joiner = options.url.indexOf('?') !== -1 ? '&' : '?';

    options.url = 
      options.url + 
      joiner + 
      '__u=' + window.encodeURIComponent(aesEncrypt(__u)) + 
      '__e=' + window.encodeURIComponent(aesEncrypt(__e))
  };

  return options;
};

export default setSecurityInformation;