// 获取文章列表
const getList = () => {

  const list = document.querySelectorAll('.entry');
  const listData = [];
  if (list.length > 0) {
    list.forEach((item) => {
      const tagList = Array.from(item.querySelector('.meta-container .tag_list')?.children || []);
      const tagsData = tagList.map((tag) => tag.textContent.trim());
      const title = item.querySelector('.content-wrapper .title-row a')?.textContent || '';
      const href = item.querySelector('.content-wrapper .title-row a')?.getAttribute('href') || '';
      listData.push({
        title: title,
        href: href,
        tags: tagsData
      });
    });
  }
  return listData;
}


// 将结果转换为 markdown
const toMarkdown = (list) => {
  let result = '';
  if (list.length > 0) {
    list.forEach((item) => {
      result += `[${item.title}](https://juejin.cn${item.href}) 🏷 ${item?.tags?.join(',')}\n`;
    });
  }
  return result;
}

// 赋值到剪切板
const toPaste = (content) => {
  const textarea = document.createElement('textarea');
  textarea.value = content;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}


const list = getList();
const result = toMarkdown(list);
toPaste(result);