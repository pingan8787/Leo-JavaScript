## webpack 4.0 B站教程 知识点

> [webpack 4.0 教程  bilibili](https://www.bilibili.com/video/av41546218/?p=1)


### 四. webpack的sass添加c3前缀和sourcemap的处理

1. 开启 `sourceMap`   

```js
// webpack.config.js

module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options:{
            sourceMap: true
          }
        }
      ]
    }
  ]
}
```
2. 使用` PostCSS` 处理 `loader`（附带：添加 `CSS3` 前缀）

`PostCSS` 用来做 `CSS` 预处理，用途：为 `CSS` 属性添加浅醉，样式格式校验（`stylelint`），提前使用 `CSS `新特性，实现 `CSS `模块化，防止 `CSS` 样式冲突。

以使用 `PostCSS` 添加前缀为例：

```shell
npm i D postcss-loader autoprefixer
```
另外还有：

* `postcss-cssnext` 可以让我们使用 `CSS4 `的样式，并能配合 `autoprefixer` 进行浏览器部分兼容的补全，还支持嵌套语法。

* `precss` 如果只需要使用嵌套，可以用它。

* `postcss-import` 让我们可以在`@import` CSS文件的时候让 `webpack` 监听并编译。

更多插件可以看 `postcss-loader` 的 github 官网介绍。

```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',{
                    loader: 'css-loader',
                    options:{
                        sourceMap: true
                    }
                },{
                    loader: 'postcss-loader',
                    options:{
                        ident:'postcss',
                        plugins: loader => {
                            require('autoprefixer')({ browsers: ['> 0.15% in CN']})
                        }
                    }
                }
            ]
        }
    ]
}
```