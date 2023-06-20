function getCardList() {
    const list = [];

    document.querySelectorAll('.card__wrapper').forEach(card => {
        const title = card.querySelector('.card__title a').textContent;
        const href = card.querySelector('.card__button-wrapper a').href;
        const desc = card.querySelector('.card__description').textContent;
        list.push({ title, href, desc });
    });

    return list;
}

function toMarkdown(list) {
    const sortedList = list.sort((a, b) => a.title.localeCompare(b.title));
    let num = 1;
    const items = sortedList.map(item => `${num++}. [${item.title}](${item.href}) 👉 ${item.desc}`);
    const markdown = items.join('\n');
    return markdown;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

const list = getCardList();

const md = toMarkdown(list);
copyToClipboard(md);
console.log(md)