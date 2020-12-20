// 广度优先遍历(breadth-first traversal，BFT)
// https://github.com/pfan123/Articles/issues/62

const createElement = (tagName, props, ...children) => {
    return {
        tagName, props, children
    }
}

const vnode = createElement(
    'div',
    {className: 'leoBox'},
    createElement(
        'span',
        {className: 'leoItem'},
        createElement(
            'span',
            {className: 'leoIcon'},
            '这是 leoIcon'
        )
    ),
    createElement(
        'span',
        {className: 'leoItem'},
        '这是 leoItem'
    )
);

const wideTraversal = vnode => {
    if(!vnode) {
        throw new Error("Empty Tree!")
    }
    const nodeList = [];
    const queue = [];
    queue.push(vnode);
    while(queue.length !== 0){
        const node = queue.shift();
        nodeList.push(node);
        if(node.children){
            for(let i = 0; i < node.children.length; i ++){
                queue.push(node.children[i])
            }
        }
    }
    return nodeList;
}

console.log(wideTraversal(vnode));