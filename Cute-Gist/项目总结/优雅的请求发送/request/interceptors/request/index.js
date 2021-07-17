/* eslint-disable import/no-duplicates */
import setSecurityInformation from './setSecurityInformation';
import setSignature from './setSignature';
import setToken from './setToken';
import setLoading from './setLoading';

/*
    执行顺序：左 -> 右
    开发拦截器的时候，根据业务需要做排序
*/
export default [
    setSecurityInformation,
    setSignature,
    setToken,
    setLoading
];