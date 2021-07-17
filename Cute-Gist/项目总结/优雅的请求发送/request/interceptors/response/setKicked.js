import { log } from "@service/logService";

/*
  拦截器名称：处理全局请求的“被踢出”场景
*/
const setKicked = result => {
  log("[interceptor.response]setKicked:", result);
  return result;
};

export default setKicked;