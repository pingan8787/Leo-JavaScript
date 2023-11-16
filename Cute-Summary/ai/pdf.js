const fs = require('fs');
const path = require('path');
const markdownpdf = require("markdown-pdf");

// 读取当前目录中的所有 .md 文件
const files = fs.readdirSync('.').filter(file => {
    // 排除纯英文文件名
    return file.endsWith('.md') && !/^[a-zA-Z]+\.md$/.test(file);
});

let combinedMarkdown = '';

// 遍历每个文件，将内容和标题合并
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const title = path.basename(file, '.md');
    combinedMarkdown += `# ${title}\n\n${content}\n\n`;
});

// 将合并后的内容写入临时 Markdown 文件
const tempMarkdownFile = 'combined.md';
fs.writeFileSync(tempMarkdownFile, combinedMarkdown);

// 检查 combined.pdf 是否存在，如果存在则删除
const outputPdfFile = "汇总.pdf";
if (fs.existsSync(outputPdfFile)) {
    fs.unlinkSync(outputPdfFile);
}

// 将 Markdown 转换为 PDF
markdownpdf().from(tempMarkdownFile).to(outputPdfFile, () => {
    console.log("Done");
    // 删除临时 Markdown 文件（可选）
    fs.unlinkSync(tempMarkdownFile);
});
