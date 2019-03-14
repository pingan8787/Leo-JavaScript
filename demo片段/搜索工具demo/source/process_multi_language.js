var fs = require('fs');
var path = require('path');
// const csv = require('csvtojson');
// const objectValues = require('object-values');
var excel = require('excel');

let totalCounts = 0; // 总条数
let validCounts = 0; // 有效条数
let duplicateItems = []; // 重复的KEY数

var INPUT_FILE_NAME = 'translate_json/languages.csv';
const OUTPUT_FILE_NAME = 'languages.json';

let langObj = {};

// compareJSON('languages.json', 'zh-cn.json');
//
// _csv2JsonAll();

_excel2JsonAll();
// async  function _csv2JsonAll() {  // row数组的索引说明：0-简体，1-繁体，2-英文，3-越南语
//     await  _csv2Json(0,1,'./translate_json/exe-zh-tw.json');
//     await _csv2Json(0,2,'./translate_json/exe-en-us.json');
//     await _csv2Json(0,3,'./translate_json/exe-vi-vn.json');
//
// };

// 0-简体，1-繁体，2-英文，3-越南语
function handleExcel(key_column, value_column, filename) {
    var cn = {}, tw = {}, us = {}, vn = {};
    return new Promise(function (resolve, reject) {
        excel.default('./translate_json/languages.xlsx').then(data => {
            // console.log(data);
            if(!data){
                reject(data);
                return ;
            }
            for(var i=0; i< data.length; i++){
                cn[data[i][0]] = data[i][0];
                tw[data[i][0]] = data[i][1];
                us[data[i][0]] = data[i][2];
                vn[data[i][0]] = data[i][3];
                // handleRowData(data[i], key_column, value_column);
            }
            console.log(cn);
            writeFile(JSON.stringify(cn), '../translate_json/exe-zh-cn.json');
            writeFile(JSON.stringify(tw), '../translate_json/exe-zh-tw.json');
            writeFile(JSON.stringify(us), '../translate_json/exe-en-us.json');
            writeFile(JSON.stringify(vn), '../translate_json/exe-vi-vn.json');
            // resolve(langObj);
            // langObj = {};
        }).catch(error => {
            reject(error);
        });

    })

}

function _excel2JsonAll() {  // row数组的索引说明：0-简体，1-繁体，2-英文，3-越南语
    handleExcel();
};

/**
 * 处理CSV文件
 */

// async  function _csv2Json(key_column,value_column,filename) {
//     return new Promise(function (resolve, reject) {
//         langObj = {};
//         csv({
//             noheader: true
//         })
//             .fromStream(fs.createReadStream('./translate_json/languages.csv', {
//                 encoding: 'utf8'
//             }))
//             .on('csv', (csvRow) => {
//             totalCounts += 1;
//         console.dir('csvRow',csvRow);
//         handleRowData(csvRow,key_column,value_column);
//      })
//         .on('done', (error) => {
//             console.dir(langObj);
//         console.log(`Total Count: ${totalCounts}`);
//         console.log(`Valid Count: ${validCounts}`);
//         console.log(`Duplicate Count: ${duplicateItems.length}`);
//         console.log(duplicateItems.sort());
//         writeFile(JSON.stringify(langObj),filename);
//         if(error){
//             reject(error);
//             return;
//         }
//         resolve();
//     });
//     })
//
// }

// 比较JSON对象
function compareJSON(src, dest) {
    let compareResult = [];
    try {
        var srcObj = JSON.parse(fs.readFileSync(path.join(__dirname, src)), {
            encoding: 'utf8'
        });
        var destObj = JSON.parse(fs.readFileSync(path.join(__dirname, dest)), {
            encoding: 'utf8'
        });
    } catch (err) {
        console.error(err);
    }
    let srcKeys = Object.keys(srcObj);
    let srcValues = objectValues(srcObj);
    let destKeys = Object.keys(destObj);
    let destValues = objectValues(destObj);
    for (let i = 0; i < srcValues.length; i++) {
        for (let j = 0; j < destValues.length; j++) {
            if (srcValues[i] === destValues[j]) {
                compareResult.push({
                    si: i,
                    sk: srcKeys[i],
                    sv: srcValues[i],
                    di: j,
                    dk: destKeys[j],
                    dv: destValues[j],
                    keq: srcKeys[i] === destKeys[j]
                })
            }
        }
    }
    console.dir(compareResult);
    writeFile(JSON.stringify(compareResult), 'compare-result.json');
}


/**
 * 处理每行数据
 * @param {*} row
 */
function handleRowData(row, key_column, value_column) {
    console.log('key_column：' + key_column);
    console.log('value_column：' + value_column);
    let key, value;
    // row数组的索引说明：0-简体，1-繁体，2-英文，3-越南语
    if (row && row[key_column]) {
        validCounts += 1;
        key = row[key_column].replace(/\s+/g, '_').toUpperCase();
        value = row[value_column];
        if (key in langObj) {
            // console.log('重复的Key：' + key);
            duplicateItems.push(`${key}:${value}`);
            return;
        }
        langObj[key] = value;
    }
}

/**
 * 输出文件
 * @param {*} jsonStr
 * @param {*} filename
 */
function writeFile(jsonStr, filename) {
    fs.writeFile(path.join(__dirname, filename || OUTPUT_FILE_NAME), jsonStr, (err) => {
        console.error(err);
    })
}
