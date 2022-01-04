import { log } from "@service/logService";

/*
  拦截器名称：处理全局请求的返回结果
  拦截器说明：将原本返回的结果格式（如 data.data.data） 转换为返回 data 对象
*/
const setResult = result => {
  log("[interceptor.response]setResult:", result);
  return result;
};

export default setResult;