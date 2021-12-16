/**
 * @author  leo
 * @date    2019.02.12
 * @update  2019.03.12
 * 温馨提示：
 * 代码千万行，
 * 注释第一行。
 * 命名不规范，
 * 同事两行泪。
 */

 /**
 * 1. 用途：
 * 检索项目中包含指定标签或类名的文件，并返回文件路径列表。
 * 检索方式：查找指定的标签或者类名两种方式。
 * 2. 使用：
 * 在本文件路径执行命令“node search_current_file.js”搜索和保存结果，
 * 然后在本文件路径执行命令“python search_current_file_python.py”绘制可视化结果。
 * 参照生成的“search_result_number.txt”结果文件，和可视化结果的图片对比。
 */

var fs      = require('fs');
var path    = require('path');
var _       = require('lodash');
var Excel   = require('exceljs');
var XLSX    = require('xlsx');    // https://www.npmjs.com/package/xlsx


var filterFile = ['.html'];  // 需要检索的文件类型
var filterDir  = ['lib'];    // 需要排除的文件夹
var labelArray = [''];       // 需要检索的标签数组 （暂不支持）
var classArray = [           // 需要检索的类名数组 （如果是标签的话 可以加个<符号表示标签开始）
  'search-holder','exe-bar-search','输入搜索内容','<exe-search','learn-search','ion-android-search'
];  
var filePath       = path.join(__dirname, '..', 'develop');        // 需要检索的文件夹路径
var allFileNumber  = 0;      // 总文件数
var resultArray    = [];     // 最终结果
var resultAlassify = {};     // 最终结果分类
var saveFileName   = 'search_current_file_' + Date.now() + '.txt'; // 保存txt文件名
var saveJSONName   = 'search_current_file_json.json';              // 保存JSON文件名
var dirFileNumber  = {};     // 文件夹文件数量统计 
var dirFileNumName = 'search_current_file_number.txt';    // 文件夹文集数量统计结果的文件名
var excelFileName  = 'search_current_file_excel.xlsx';    // 导出Excel文件名
var excelReadName  = '2.0项目路由导出.xlsx';               // 读取Excel文件名
var excelFileArr   = [];     // excel文件内容数组
var excelFileObj   = {};


/**
 * 获取当前项目的所有HTML文件
 * @param {string} paths 文件的路径
 */
var getCurrenAllFile = function (paths){
  var fileArr  = [];
  // 初始化最终结果分类的对象
  _.forEach(classArray, function(val, key){
    resultAlassify[val] = []; 
  });
  fs.readdir(paths, function(err, files){
    _.forEach(files, function(item, index){
      var c_path = path.join(paths, item);
      var stat = fs.lstatSync(c_path);
      if(stat && stat.isDirectory()){
        if(filterDir.indexOf(item) < 0) getCurrenAllFile(c_path); // 排除不需要检索的文件夹
      }else{
        if(filterFile.indexOf(path.extname(item)) >= 0 ){
          getCurrentFile(c_path, item);
                // fileArr.push(path.resolve(__dirname, item))
        }
      }
    });
  });
  return fileArr;
}

/**
 * 获取当前文件内容
 * @param {string} paths    文件的路径
 * @param {string} filename 文件名
 */
var getCurrentFile = function(paths, filename){
  fs.readFile(paths, 'utf8', function(err, data){
    allFileNumber ++;
    // console.log('正在检索第'+ allFileNumber +'个文件，文件名：【'+ filename +'】');
    if (err) console.log(err);
    searchCurrentFile(data, paths);
  });
};

/**
 * 检索当前文件内容
 * @param {string} data  文件的内容
 * @param {string} paths 文件的路径
 */
var searchCurrentFile = function(data, paths){
  _.forEach(classArray, function(val){
    // 清楚单引号和双引号的影响
    data.replace(/'/g,'');
    data.replace(/"/g,'');
    if(data.indexOf(val) >= 0){
      // console.log('--------------检索到结果，路径为：'+paths)
      resultArray.push(paths);
      resultAlassify[val].push(paths);
    }
  });
};

/**
 * 转成JSON数据，用来数据可视化
 * @param {object} data  需要处理的数据
 */
var saveDataToJson = function (data){
  var result = {};
  console.log('*************************转成JSON数据开始*************************')
  // 第一层分组
  result = _.groupBy(data, function(item){
    item = item.replace(filePath+'\\','');
    var list = item.split('\\');
    return list[0];
  });
  // 第二层分组
  for(var k in result){
    result[k] = _.groupBy(result[k], function(i){
      i = i.replace(filePath+'\\','');
      var r = i.split('\\');
      return r[1];
    });
  }
  for(var i in result){
    for(var m in result[i]){
      for(var n in result[i][m]){
        var currentPath = result[i][m][n].replace(filePath+'\\','');
        currentPath = currentPath.replace(/\\/g, '/');
        var current = excelFileObj[currentPath];
        result[i][m][n] = {
          title : current ? current['路由名称'] : '该文件为模块',
          path  : current ? current['文件路径'] : currentPath,
          url   : current ? current['url'] : '该文件为模块',
          params: current ? current['路由参数'] : '该文件为模块',
          ctrl  : current ? current['控制器名称'] : '该文件为模块',
          urls  : current ? current['url'] : '该文件为模块',
        };
      }
    }
  }

  setJSONFile(result);         // 保存JSON文件
  setEachDirFileNum(result);   // 计算每个子文件夹下文件数量
  console.log('*************************转成JSON数据结束*************************')
};


/**
 * 保存JSON文件
 * @param {object} data  需要处理的数据
 */
var setJSONFile = function (data){
  fs.writeFile(saveJSONName , JSON.stringify(data), 'utf8' , function(err){
    if(err) console.log(err);
    console.log(saveJSONName + ' JSON文件保存成功！');
  })
};


/**
 * 计算每个子文件夹中文件数量
 * @param {object} data  需要处理的数据
 */
var setEachDirFileNum = function(data){
  var text = '', result = {};   // 将JSON具体数据转成对象
  for(var k in data){
    text += '-----------------文件夹【' + k + '】----------------------\r\n';
    dirFileNumber[k] = {};
    result[k] = {};
    for(var i in data[k]){
      dirFileNumber[k][i] = data[k][i].length;
      result[k][i] = [];
      text += '---子文件夹（' + i + '）（有子文件' + data[k][i].length + '个），分别是：---\r\n' 
      for(var m in data[k][i]){
        result[k][i].push(data[k][i][m]);
        text += data[k][i][m].path.toString().replace(/,/g,'\r\n') + '\r\n';
      }
      text += '------------------------------------------------\r\n';
    }
    text += '------------------------end---------------------\r\n\r\n';
  }
  setExcelFile(result);        // 保存Excel文件
  fs.writeFile(dirFileNumName , text, 'utf8' , function(err){
    if(err) console.log(err);
    console.log(dirFileNumName+' 数量统计文件保存成功！');
  })
};

/**
 * 保存Excel数据
 * @param {object} data  需要处理的数据
 * return excelFileName.xlsx
 */
var setExcelFile = function(data){
  var workbook = new Excel.Workbook();
  workbook.creator = 'EXE';
  workbook.lastModifiedBy = 'Leo';
  workbook.created     = new Date();
  workbook.modified    = new Date();
  workbook.lastPrinted = new Date();
  for(var item in data){  // 第一层循环 外层文件夹 templates views
    for(var list in data[item]){
      var worksheet = workbook.addWorksheet(list.toUpperCase());
      worksheet.columns = [
        { header: '页面标题'  , key: 'title' , width: 40 },
        { header: '文件路径'  , key: 'path'  , width: 60 },
        { header: '路由地址'  , key: 'url'   , width: 40 },
        { header: '路由参数'  , key: 'params', width: 40 },
        { header: '控制器名称', key: 'ctrl'  , width: 40 },
        { header: 'url'      , key: 'urls'  , width: 40 },
      ];
      var rowData = data[item][list];
      for(var row in rowData){
        worksheet.addRow({
          title : rowData[row].title,
          path  : rowData[row].path,
          url   : rowData[row].url,
          params: rowData[row].params,
          ctrl  : rowData[row].ctrl,
          urls  : rowData[row].urls,
        }) 
      }
    }

  }

    workbook.xlsx.writeFile(path.join(__dirname, excelFileName))
        .then(function() {
            console.log(excelFileName + ' 文件生成成功');
            console.log('下一步生成饼图，请执行（python search_current_file_python.py）');
        });
};


/**
 * 读取Excel数据
 * get excelReadName
 */
var getExcelFile = function(){
  return new Promise(function(resolve, reject){
    var excelPath = path.join(__dirname, excelReadName);
    fs.exists(excelPath, function(exists){
      if(exists){
        var workbook = XLSX.readFile(excelPath, {type: 'base64'});// 获取 Excel 中所有表名
        var sheetNames = workbook.SheetNames;
        resolve({workbook: workbook, sheetNames: sheetNames});
      }else{
        reject({message:'错误提示：请先获取路由列表文件！（执行node get_router.js）'});
      }
    });
  })
};

/**
 * 解析Excel数据
 * @param {object} workbook    excel工作区数据
 * @param {object} sheetNames  excel工作表名数据
 */
var getEachSheet = function(workbook, sheetNames){
  _.forEach(sheetNames,function(item,index){
    var sheet = workbook.Sheets[sheetNames[index]];
    var json = XLSX.utils.sheet_to_json(sheet);  // 针对单个表，返回序列化json数据
    excelFileArr = excelFileArr.concat(json);    // 不能使用lodash的_.concat 因为lodash版本太低
  })
  _.forEach(excelFileArr, function(val, key){
    excelFileObj[val['文件路径']] = val;
    // fs.writeFile('excelFileArr.txt' , JSON.stringify(excelFileObj), 'utf8' , function(err){
    //   if(err) console.log(err);
    //   console.log(' excelFileArr文件保存成功！');
    // })
  });

}

/**
 * 初始化项目
 */
var init = function (){
  console.log('^-^ 程序运行开始！');
  getExcelFile().then(function(data){
    getEachSheet(data.workbook, data.sheetNames); // 读取Excel文件
    getCurrenAllFile(filePath);
    setTimeout(function(){
      var text = '';
      resultArray = _.uniq(resultArray);// 对结果进行去重
      saveDataToJson(resultArray);      // 整理成JSON格式
      text = '-----------------所有检索结果（已去重）（共' + resultArray.length+ '个）----------------------\r\n' 
          + resultArray.toString().replace(/,/g,'\r\n') + '\r\n'
          + '------------------------------------------------\r\n\r\n';
      _.forEach(classArray, function(val, key){
        text = text 
          + '-------关键词【' + val + '】检索结果（共' + resultAlassify[val].length+ '个）-------\r\n'
          + resultAlassify[val].toString().replace(/,/g,'\r\n') + '\r\n'
          + '------------------------------------------------\r\n\r\n';
      });
      fs.writeFile(saveFileName , text, 'utf8' , function(err){
        if(err) console.log(err);
        console.log(saveFileName + ' 检索结果文件保存成功！');
        console.log('^-^ 程序运行结束！');
      })
    },2000)
  }).catch(function(err){
    console.log(err.message)
  });              
};

init();