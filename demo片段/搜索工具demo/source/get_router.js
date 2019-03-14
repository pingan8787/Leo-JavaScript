var path = require('path');
var fs = require("fs");
var VIEW_PATH = path.join(__dirname, '../develop/views/');
var viewPath = fs.readdirSync(VIEW_PATH);
var Excel = require('exceljs');

var EXTENSION = '.js';
var allJS = {};

// 扫描文件，获得所有views目录下的JS文件
function scanJS() {
    console.log('开始扫描文件');
    viewPath.forEach(function (dir) {
        if(dir != '.DS_Store') {
            var filePath = path.join(VIEW_PATH, dir);
            var files = fs.readdirSync(filePath);
            var targetFiles = files.filter(function(file) {
                return path.extname(file).toLowerCase() === EXTENSION;
            });
            if(targetFiles && targetFiles.length) {
                allJS[dir] = path.join(filePath, targetFiles[0]);
            }
        }
    });
    setJs();
}

function setJs() {
    var str = '';
    for ( var key in allJS) {
        if(key !=='live' && key !=='login') { // 目前排除登录和直播两个模块的JS，因为不是按照规范的写法来写的。
            str += readJsAndGetRoute(allJS[key]);
        }
    }
    str = 'module.exports = {' + str + '}';

    var router = eval(str);
    // fs.writeFileSync(path.join(__dirname, 'router.js'), str, {
    //     encoding: 'UTF-8'
    // });
    var workbook = new Excel.Workbook();

    workbook.creator = 'EXE';
    workbook.lastModifiedBy = 'Yu';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    for (var routerKey in router) {
        var worksheet = workbook.addWorksheet(routerKey);
        worksheet
        .columns = [
            { header: '路由名称', key: 'cname', width: 20 },
            { header: '路由地址', key: 'state', width: 40},
            { header: '路由参数', key: 'params', width: 60},
            { header: '文件路径', key: 'path', width: 60},
            { header: '控制器名称', key: 'ctrl', width: 40},
            { header: 'url', key: 'url', width: 40}
        ];
        var rowData = router[routerKey];
        for (var row in rowData) {
            var params = rowData[row].option.params;
            var newParams = {};
            for (var key in params)  {
                if(params[key] && params[key].required) {
                    newParams[key] = params[key].summary
                }
            }
            // 添加文件路由 和 控制器名称  leo
            var views = rowData[row].option.views;
            var newPath = '';
            var newCtrl = '';
            for(var k in views){
                if(k == 'main-content'){
                    newPath = views[k].templateUrl;
                    newCtrl = views[k].controller;
                }
            }

            worksheet.addRow({
                cname: rowData[row].option.cname || '<代码内没有名称>',
                state: rowData[row].state,
                params: newParams,
                path: newPath,
                ctrl: newCtrl,
                url: rowData[row].option.url
            });
        }

    }


    workbook.xlsx.writeFile(path.join(__dirname, '2.0项目路由导出.xlsx'))
        .then(function() {
            console.log('导出路由成功');
        });
}

function description(summary) {
    return {
        required: true,
        summary
    }
}

function readJsAndGetRoute(routerJsPath) {

    var jsFile = fs.readFileSync(routerJsPath, {
        encoding: 'UTF-8'
    });
    var reg = /angular\.module\('exeApp'\)\s*\.\s*constant\s*\(\'.*\'\s*,\s*\[\s*({[\s\S]*?(}\s*,*\s*\]\)[^\.]))/g;
    // \s*({[\s\S]*?(}\s*,\s*[^{]*)){1}

    var route = jsFile.match(reg)[0];
    var key = route.match(/angular\.module\('exeApp'\)\s*\.\s*constant\s*\(\'.*\'/g)[0].replace(/angular\.module\('exeApp'\)\s*\.\s*constant\s*\(\'/g, '').replace("'", '');
    var str = route.replace(/angular\.module\('exeApp'\)\s*\.\s*constant\s*\(\'.*\'\s*,/g, '').replace(/]\s*\)/g,"]");

    var jsonStr = key + ':' + str + ',';
    jsonStr = jsonStr.replace(/\/\/description-/g, ',,,,');
    jsonStr = jsonStr.replace(/,?\s*,,,,/g, ',');
    // console.log(jsonStr)
    return jsonStr;
}

scanJS();