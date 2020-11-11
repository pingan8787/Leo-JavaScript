// Virtual DOM
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

console.log(vnode)