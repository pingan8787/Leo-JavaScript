/**
 * 将时间转换为距离现在多少时间的文本
 * 例如："2021-10-28 15:56:27" =>  "1个月前"
 * TODO: 支持各种时间格式，支持多语言，支持自定义返回格式
 *
 * @param {String} dateTimeStamp // 目前只支持参数是 "2021-10-28 15:56:27" 这种格式
 * @returns
 */
export const timeago = dateTimeStamp => {
  if (!dateTimeStamp) return "";
  const time = new Date(dateTimeStamp);

  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime(); //获取当前时间毫秒
  const diffValue = now - time; //时间差

  if (diffValue < 0) {
    return;
  }
  const minC = diffValue / minute; //计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;

  let result = "";
  if (monthC >= 1 && monthC < 4) {
    result = " " + parseInt(monthC) + "个月前";
  } else if (weekC >= 1 && weekC < 4) {
    result = " " + parseInt(weekC) + "周前";
  } else if (dayC >= 1 && dayC < 7) {
    result = " " + parseInt(dayC) + "天前";
  } else if (hourC >= 1 && hourC < 24) {
    result = " " + parseInt(hourC) + "小时前";
  } else if (minC >= 1 && minC < 60) {
    result = " " + parseInt(minC) + "分钟前";
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚";
  } else {
    result = dateTimeStamp; // TODO: 支持自定义返回格式
    // const datetime = new Date();
    // datetime.setTime(dateTimeStamp);
    // const Nyear = datetime.getFullYear();
    // const Nmonth =
    //   datetime.getMonth() + 1 < 10
    //     ? "0" + (datetime.getMonth() + 1)
    //     : datetime.getMonth() + 1;
    // const Ndate =
    //   datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    // const Nhour =
    //   datetime.getHours() < 10
    //     ? "0" + datetime.getHours()
    //     : datetime.getHours();
    // const Nminute =
    //   datetime.getMinutes() < 10
    //     ? "0" + datetime.getMinutes()
    //     : datetime.getMinutes();
    // const Nsecond =
    //   datetime.getSeconds() < 10
    //     ? "0" + datetime.getSeconds()
    //     : datetime.getSeconds();
    // result = Nyear + "-" + Nmonth + "-" + Ndate;
  }
  return result;
};
