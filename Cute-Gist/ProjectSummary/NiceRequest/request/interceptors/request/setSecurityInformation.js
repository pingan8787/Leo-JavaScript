import { log } from "@service/logService";
import { USER_STORAGE_KEY } from '@config/constantNames';
import exeStorage from '@service/storageService';
import { aesEncrypt } from '@utils/index';

/*
  拦截器名称：全局设置请求的 url 安全信息
  拦截器说明：在 url 后面添加查询参数 __u __v 等参数
*/
const setSecurityInformation = options => {
  log("[interceptor.request]setSecurityInformation:", options);
  
  if(!options.url) return options;
  if (options.noSignature) return options;

  const userData = exeStorage.getItemSync(USER_STORAGE_KEY) || {};
  const { tenantId = '', userId = '' } = userData;
  if(tenantId && userId){
    const joiner = options.url.indexOf('?') !== -1 ? '&' : '?';
    const versionStr = '';
    options.url = options.url + joiner + '__u='
      + window.encodeURIComponent(aesEncrypt(tenantId + ':' + userId))
      + '__e=' + window.encodeURIComponent(aesEncrypt(versionStr))
  }
  return options;
};

export default setSecurityInformation;