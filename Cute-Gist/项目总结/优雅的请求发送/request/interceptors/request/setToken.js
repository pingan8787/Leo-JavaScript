import { log } from "@service/logService";
import { parseUrlQuery } from "@utils/index";

/*
  拦截器名称：全局设置请求的 token 内容
*/
const setToken = options => {
  log("[interceptor.request]setToken:", options);

  const { token } = parseUrlQuery();
  if(token) {
    options.header['token'] = token;
  };
  return options;
};

export default setToken;