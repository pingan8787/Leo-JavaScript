/* eslint-disable import/no-mutable-exports */
import Taro from "@tarojs/taro";
import { getInterceptor } from '@request/interceptors'; 

Taro.addInterceptor(getInterceptor);

export const request = Taro.request;
export const requestTask = Taro.RequestTask;
export const addInterceptor = Taro.addInterceptor;