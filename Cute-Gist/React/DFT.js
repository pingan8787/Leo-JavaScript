// 深度优先遍历(depth-first traversal，DFT)
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

const deepTraversal = vnode => {
    if(!vnode) {
        throw new Error("Empty Tree!")
    }
    const nodeList = [];
    const stack = [];
    stack.push(vnode);
    while(stack.length !== 0){
        const node = stack.pop();
        nodeList.push(node);
        if(node.children){
            for(let i = node.children.length - 1; i >= 0; i --){
                stack.push(node.children[i])
            }
        }
    }
    return nodeList;
}

console.log(deepTraversal(vnode));