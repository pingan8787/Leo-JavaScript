/*
    对象深层取数方法
    eg: { a: 1, b: { c: 2 }}

    通过 b.c 得到 2
*/
const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

const bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));

function parseObjectPath (path){
    if (bailRE.test(path)) {
        return
      }
      const segments = path.split('.');
      return function (obj) {
        for (var i = 0; i < segments.length; i++) {
          if (!obj) { return }
          obj = obj[segments[i]];
        }
        return obj
      }
}