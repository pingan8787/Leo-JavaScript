/**
 * 递归判断文件夹是否存在, 不存在创建一个
 * @param {*} src 需要处理的路径
 * @returns 
 */
 const isExist = src => { 
    if (fs.existsSync(src)) {
      return true;
    } else {
      if (isExist(path.dirname(src))) {
        fs.mkdirSync(src);
        return true;
      }
    }
}