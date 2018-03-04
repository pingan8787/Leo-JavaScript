> 大家都知道，Vuejs的 `CLI工具` 是基于 `webpack` 来实现的，所以在项目打包后，会生成的文件会很大。  
> 主要原因是 `webpack` 将我们所有文件都打包成一个js文件，即使再小的项目，打包之后文件都会变得很大。  
> 下面讲讲最近我遇到的相同问题。  

****
|Author|王平安|
|---|---
|E-mail|pingan8787@qq.com
|博客|www.pingan8787.com
|微信|pingan8787
****

### 问题
由于这次项目是在初学 `Vue` 之后的第一个正式项目，没有考虑到类似 `路由懒加载`、 `按需加载`的问题 ，所以呢，也算是没经验。  
到了这些天，项目写得差不多了，准备放到服务器测试，才发现这个问题。  
>优化前：
```bash
app.js        2.3MB
vendor.js     2.4MB
vendor.css    612kB
app.js.map    9.13MB
vendor.js.map 16.21MB
//不一一列举....
```
接下来看看我的优化方法。

### 优化方法1：不生成.map文件
在 `webpack.prod.cong.js` 文件下，修改配置项 `sourceMap` 设置为 `false` 或者删除：
```js
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    // sourceMap: true  //将sourceMap关闭就不会打包出.map文件
}),

```
这样的话，开发环境就不会生成 `.map` 文件。

### 优化方法2：按需加载
对于项目中，一些 `通用` 或者 `不是特别差异` 的组件可以使用按需加载，在需要的时候加载即可，并且会自动缓存。
这时候需要在 `router` 文件夹下的 `index.js` 文件修改路由配置中的 `组件引入` 方式：
```js
Vue.use(Router)
export default new Router({
    routes:[{
        path:'/',
        component:function(resolve){
            require(['./../components/Index'],resolve)
        }
    }]
}) 
```
这样的话，这个组件就会在你需要加载的时候才会加载。

### 优化方法3：VueRouter的懒加载
[官方文档](https://router.vuejs.org/zh-cn/advanced/lazy-loading.html)
在 `vue-router` 的模块引入，将默认的 `import .. from ..` 引入方式，修改为一步。如下：
```js
const Foo = () => import('/Foo.vue')
``` 
然后在 `配置路由` 中，和之前一样使用：
```js
Vue.use(Router)
export default new Router({
    routes:[{
        path:'/',
        component:Foo
    }]
}) 
```

### 优化方法4：将大的第三方包通过<script>标签引入
一般将类似 `echarts` 这种比较大的第三方依赖包，通过 `<script></script>` 标签来引入的话，会很大程度缩小打包的大小。   
但是需要在 `vue` 配置文件这样配置：
`webpack.base.config.js` 中添加 `不打包` 的包的名称，这样打包的时候才不会把这些包一起打包进去：  
```js
module.exports = {
    entry:{...},
    output:{...},
    resolve:{...},
    module:{...},
    externals:{
        "echarts":"echarts"  //不打包的包名
    }
}
```
然后在 `index.html` 中用 `<script></script>` 标签引入依赖包的CDN或者其他地址。

### 优化方法5：图片压缩
这个不用怎么说，有个地址很好用，推荐下：[tinypng](https://tinypng.com/#)

### 优化后
通过这几步骤，优化完成的每个文件都会缩小好多倍：
```bash
app.js        136.2kB
vendor.js     213.2kB
vendor.css    612kB   //css 这个我还没办法
app.js.map    0MB
vendor.js.map 0MB
```
### 结语
世上无难事，只怕没灵感，静一静然后灵感就出现了，嘻嘻。