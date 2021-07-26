import { log } from '../log';
import request from './request/index';
import response from './response/index';

export const interceptor = {
    request,
    response
};

export const runInterceptors = instance => {
    log('[runInterceptors]', instance);
    
    // 设置请求拦截器
    for (const key in request) {
      const { success, error } = request[key];
      axios.interceptors.request.use(success, error);
    }
  
    // 设置响应拦截器
    for (const key in response) {
      const { success, error } = response[key];
      axios.interceptors.response.use(success, error);
    }
  
    return axios;
}