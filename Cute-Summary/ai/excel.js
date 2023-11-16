const fs = require('fs');
const ExcelJS = require('exceljs');

// 创建一个新的工作簿
const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('MD Files');

// 设置列标题
worksheet.columns = [
    { header: 'File Name', key: 'fileName', width: 30 },
    { header: 'Content', key: 'content', width: 100 }
];

// 读取当前目录中的所有 .md 文件
const files = fs.readdirSync('.').filter(file => {
    return file.endsWith('.md') && !/^[a-zA-Z]+\.md$/.test(file);
});

// 遍历每个文件，将文件名和内容添加到表格
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    worksheet.addRow({ fileName: file, content: content });
});

// 将工作簿保存为 Excel 文件
const excelFile = '汇总.xlsx';
workbook.xlsx.writeFile(excelFile)
    .then(() => {
        console.log('Excel file created successfully.');
    })
    .catch(err => {
        console.error(err);
    });
