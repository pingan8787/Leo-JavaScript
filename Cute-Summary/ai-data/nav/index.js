import source from './data.json' assert { type: 'json' };
import ExcelJS from 'exceljs';


// 第一步：将 a 转换成 b
function transformToJsonArray(data) {
    let result = [];
    for (const tag in data) {
        data[tag].forEach(item => {
            result.push({ ...item, tag });
        });
    }
    return result;
}

const b = transformToJsonArray(source);


// 第二步：将 b 转换为 Excel 表格
async function convertJsonToExcel(jsonArray) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // 添加表头
    worksheet.columns = [
        { header: '名称', key: 'title', width: 30 },
        { header: '介绍', key: 'desc', width: 30 },
        { header: '分类', key: 'tag', width: 15 },
        { header: '网址', key: 'url', width: 15 },
        { header: '图标', key: 'logo', width: 30 },
    ];

    // 添加数据
    worksheet.addRows(jsonArray);

    // 保存到文件
    await workbook.xlsx.writeFile('data.xlsx');
}

// 第三步：调用函数生成并下载 Excel 文件
convertJsonToExcel(b);
