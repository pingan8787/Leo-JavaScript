import axios from 'axios';
import { setInterceptors } from './interceptors/index';

export const requestConfig = {
    // baseURL: "http://localhost:3000/",
    timeout: 10000,
}

let request = axios.create(requestConfig);

request = setInterceptors(request);

export default request;