import { log } from '../log';
import request from './request/index';
import response from './response/index';

export const interceptor = {
    request,
    response
};

export const runInterceptors = instance => {
    log('[runInterceptors]', instance);

    if(!instance) return;
    // 设置请求拦截器
    for (const key in request) {
        instance.interceptors.request
            .use(config => request[key](config));
    }

    // 设置响应拦截器
    for (const key in response) {
        instance.interceptors.response
            .use(result => response[key](result));
    }

    return instance;
}