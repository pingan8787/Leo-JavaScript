import { log } from "../../log";
import { getSignature } from '../../utils';

/*
  拦截器名称：全局设置请求添加加签信息
  拦截器说明：目前采用 V1 加签方法，后续考虑使用 V2 加签方法。
*/
const setSignature = options => {
  log("[interceptor.request]setSignature:", options);

  if (!options.headers) {
    options.headers = {};
  }

  // example: 根据实际业务生成请求头的加签信息
  const signatureHeader = getSignature();
  Object.assign(options.headers, signatureHeader);
  return options;
};

const setError = error => {

}

export default {
  success: setSignature,
  error: setError
};