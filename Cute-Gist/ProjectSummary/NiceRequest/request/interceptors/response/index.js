/* eslint-disable import/no-duplicates */
import setKicked from './setKicked';
import setResult from './setResult';
import setLoading from './setLoading';
import setError from './setError';

/*
    执行顺序：左 -> 右
    开发拦截器的时候，根据业务需要做排序
*/
export default [
    setLoading,
    setError,
    setKicked,
    setResult,  // TODO 放在最后一个，统一处理返回结果
];