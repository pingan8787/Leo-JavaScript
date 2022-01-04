import { log } from "@service/logService";
import { USER_STORAGE_KEY } from '@config/constantNames';
import EftSecurityLibrary from "@assets/js/eft-security-library.umd";
import exeStorage from '@service/storageService';

/*
  拦截器名称：全局设置请求添加加签信息
  拦截器说明：目前采用 V1 加签方法，后续考虑使用 V2 加签方法。
*/
// TODO EftSecurityLibrary 可能会有重复实例化问题
const eftSecurity = new EftSecurityLibrary();
const { Signature } = eftSecurity.pluginMap;

const setSignature = options => {
  log("[interceptor.request]setSignature:", options);

  if (options.noSignature) return options;
  if (!options.header) {
    options.header = {};
  }

  // TODO 支持使用 request-id 绕过加签
  if(options.noSignature){
    options.header['request-id'] = new Date().getTime();
  }else{
    // TODO 加签需要用 userId
    const { userId } = exeStorage.getItemSync(USER_STORAGE_KEY) || {};
    const signatureObj = Signature.signatureV1Interceptor(userId || "");
    Object.assign(options.header, signatureObj);
  }
  return options;
};

export default setSignature;