import request from './interceptors/request';
import response from './interceptors/response';

export const interceptor = {
    request,
    response
};

export const getInterceptor = (chain = {}) => {
  // 设置请求拦截器
  let requestParams = chain.requestParams;
  for (const key in request) {
    requestParams = request[key](requestParams);
  }

  // 设置响应拦截器
  let responseObject = chain.proceed(requestParams);
  for (const key in response) {
    responseObject = responseObject.then(res => response[key](res));
  }
  return responseObject;
};
