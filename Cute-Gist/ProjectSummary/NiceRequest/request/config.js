// 直接返回接口数据的响应状态码
export const userReturnResult = [ 230003, 230004, 35005, 350001, 350004 ];

export const isFailedReq = res => {
  const { code, data } = res;
  return userReturnResult.includes(code) || (data == null && code != 200)
}
