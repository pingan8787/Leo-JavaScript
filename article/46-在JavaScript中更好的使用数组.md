[阅读原文](https://juejin.im/post/5b8d0a74f265da431d0e7ec0)
[MDN Array 介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)


本文短小精悍，我保证。在过去的数个月里，我注意到在我审阅的 pull request 中有四个（关于数组使用的）错误经常出现。同时，我自己也会犯这些错误，因此有了这篇文章。让我们一起学习，以确保以后能正确地使用数组方法！

## 1.使用 `Array.includes` 替代 `Array.indexOf`

> "如果需要在数组中查找某个元素，请使用 `Array.indexOf`。"

我记得在我学习 JavaScript 的课程中有类似的这么一句话。毫无疑问，这完全正确！
在 MDN 文档中，对 `Array.indexOf` 的描述是：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`。因此，如果在之后的代码中需要用到（给给定元素的）索引，那么` Array.indexOf` 是不二之选。
然而，如果我们仅需要知道数组中是否包含给定元素呢？这意味着只是是与否的区别，这是一个布尔问题（boolean question）。针对这种情况，我建议使用直接返回布尔值的 `Array.includes`。
```js
'use strict';

const characters = [
    'ironman',
    'black_widow',
    'hulk',
    'captain_america',
    'hulk',
    'thor',
];

console.log(characters.indexOf('hulk'));
// 2
console.log(characters.indexOf('batman'));
// -1

console.log(characters.includes('hulk'));
// true
console.log(characters.includes('batman'));
// false
```

## 2.使用 `Array.find` 替代 `Array.filter`
`Array.filter` 是一个十分有用的方法。它通过回调函数过滤原数组，并将过滤后的项作为新数组返回。正如它的名字所示，我们将这个方法用于过滤，（一般而言）会获得一个长度更短的新数组。
然而，如果知道经回调函数过滤后，只会剩余唯一的一项，那么我不建议使用 `Array.filter`。比如：使用等于某个唯一 ID 为过滤条件去过滤一个数组。在这个例子中，`Array.filter` 返回一个仅有一项的新数组。然而，我们仅仅是为了获取 ID 为特定 ID 的那一项，这个新数组显得毫无用处。
让我们讨论一下性能。为了获取所有符合回调函数过滤条件的项，`Array.filter` 必须遍历整个数组。如果原数组中有成千上万项，回调函数需要执行的次数是相当多的。
为避免这些情况，我建议使用 `Array.find`。它与 `Array.filter` 一样需要一个回调函数，（但只是返回）符合条件的第一项。当找到符合回调函数过滤条件的第一个元素时，它会立即停止往下的搜寻。不再遍历整个数组。
```js
'use strict';

const characters = [
    { id: 1, name: 'ironman' },
    { id: 2, name: 'black_widow' },
    { id: 3, name: 'captain_america' },
    { id: 4, name: 'captain_america' },
];

function getCharacter(name) {
    return character => character.name === name;
}

console.log(characters.filter(getCharacter('captain_america')));
// [
// { id: 3, name: 'captain_america' },
// { id: 4, name: 'captain_america' },
// ]

console.log(characters.find(getCharacter('captain_america')));
// { id: 3, name: 'captain_america' }
```

## 3.使用 `Array.some` 替代 `Array.find`
我承认我经常犯这个错误。之后，一位朋友建议我去查看 [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 以寻找更好的方法。事实上（这错误）与上面 `Array.indexOf`/`Array.includes` 的例子十分相像。
在上面的例子中，我们知道 `Array.find` 需要一个回调函数作为参数，并返回（符合条件的）第一个元素。然而，当我们需要知道数组中是否存在一个元素时，`Array.find` 是最好的选择吗？不一定是，因为它返回一个元素，而不是一个布尔值。
在下面的例子中，我建议使用 `Array.some`，它返回你需要的布尔值。
```js
'use strict';

const characters = [
    { id: 1, name: 'ironman', env: 'marvel' },
    { id: 2, name: 'black_widow', env: 'marvel' },
    { id: 3, name: 'wonder_woman', env: 'dc_comics' },
];

function hasCharacterFrom(env) {
    return character => character.env === env;
}

console.log(characters.find(hasCharacterFrom('marvel')));
// { id: 1, name: 'ironman', env: 'marvel' }

console.log(characters.some(hasCharacterFrom('marvel')));
// true
```
译者注：补充一下 `Array.some` 与 `Array.includes` 使用上的区别。两者都返回一个布尔值，表示某项是否存在于数组之中，一旦找到对应的项，立即停止遍历数组。不同的是 `Array.some` 的参数是回调函数，而 `Array.includes` 的参数是一个值（均不考虑第二个可选参数）。
假设希望知道值为 value 的项是否存在于数组中，既可以编写代码：`[].includes(value)`， 也可以给 `Array.some` 传入 `item =&gt; item === value` 作为回调函数。`Array.includes` 使用更简单，`Array.some` 可操控性更强。

## 4.使用 `Array.reduce` 替代 `Array.filter` 与 `Array.map` 的组合
事实上说，`Array.reduce` 不太容易理解。然而，如果我们先使用 `Array.filter` 过滤原数组，之后（对结果）再调用 `Array.map` （以获取一个新数组）。这看起似乎有点问题，是我们忽略了什么吗？
这样做的问题是：我们遍历了两次数组。第一次是过滤原数组以获取一个长度稍短的新数组，第二次遍历（译者注：指 `Array.map`）是对 `Array.filter` 的返回的新数组进行加工，再次创造了一个新数组！为得到最终的结果，我们结合使用了两个数组方法。每个方法都有它自己的回调函数，而且供 `Array.map` 使用的临时数组是由 `Array.filter` 提供的，（一般而言）该数组无法复用。
为避免如此低效场景的出现，我的建议是使用 `Array.reduce` 。一样的结果，更好的代码！`Array.reduce` 允许你将过滤后切加工过的项放进累加器中。累加器可以是需要待递增的数字、待填充的对象、 待拼接的字符串或数组等。
在上面的例子中，我们使用了 `Array.map`，（但更）建议使用累加器为待拼接数组的 `Array.reduce` 。在下面的例子中，根据变量 `env` 的值，我们会将它加进累加器中或保持累加器不变（即不作任何处理）。
```js
'use strict';

const characters = [
    { name: 'ironman', env: 'marvel' },
    { name: 'black_widow', env: 'marvel' },
    { name: 'wonder_woman', env: 'dc_comics' },
];

console.log(
    characters
    .filter(character => character.env === 'marvel')
    .map(character => Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
);
// [
// { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
// { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
// ]

console.log(
    characters
    .reduce((acc, character) => {
        return character.env === 'marvel'
        ? acc.concat(Object.assign({}, character, { alsoSeenIn: ['Avengers'] }))
        : acc;
    }, [])
)
// [
// { name: 'ironman', env: 'marvel', alsoSeenIn: ['Avengers'] },
// { name: 'black_widow', env: 'marvel', alsoSeenIn: ['Avengers'] }
// ]
```

### 这就是本文的全部内容！
希望这对你有帮助。如果你对本文有任何意见或（关于数组方法使用的）例子需要讨论，请在评论中告诉我。如果你觉得本文不错，请给我点赞 👏 （译者注：对灯发誓，这是原文，不是译者骗赞！）并分享给更多的小伙伴。感谢你的阅读！

注意：请在使用 `Array.find` 和 `Array.includes` 前检查浏览器是否支持相关方法，上述两个方法在 Internet Explorer 上并不支持（译者注：可以使用` Polyfill`）。
