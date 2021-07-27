最近在重构一个项目，主要是做 H5 端和小程序端，这次打算开始多做总结啦，之前已经总结一篇[《如何优雅的管理 HTTP 请求和响应拦截器？》](https://juejin.cn/post/6986455896708612110) 。

如果大家还有其他方案，欢迎一起探讨哈~也欢迎喜欢本文的朋友点个赞👍啦~

## 一、需求思考和方案设计
本文介绍的项目是使用 [Taro](https://taro-docs.jd.com/taro/docs/README)框架进行多端开发，目前主要适配 H5 端和微信小程序端。项目使用的字体图标库内部维护，目前托管在 [iconfont](https://www.iconfont.cn/) 上。


### 1. 问题分析
最近在重构的项目比较古老（其实也就去年的），项目中使用到的图标早已更新 N 个迭代了，已经由**单色图标**更新到**多色图标**！
![](https://images.pingan8787.com/image/svg-icon/1.png)
很明显好看多了。

这里先按照 [iconfont 的规则](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code)看看单色图标和多色图标使用上的区别：
#### 单色图标的使用
单色图标使用起来比较简单（以 font-class 引用为例），只需要 2 个步骤：

- 第一步：拷贝项目下面生成的fontclass代码：
```css
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css
```

- 第二步：挑选相应图标并获取类名，应用于页面：
```html
<i class="iconfont icon-xxx"></i>
```

#### 多色图标的使用
多色图标使用起来也很简单（以 symbol 引用为例），只需要 3 个步骤：

- 第一步：拷贝项目下面生成的symbol代码：
```bash
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js
```

- 第二步：加入通用css代码（引入一次就行）：
```html
<style type="text/css">
    .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
</style>
```

- 第三步：挑选相应图标并获取类名，应用于页面：
```html
<svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-xxx"></use>
</svg>
```

这两种图标在使用上都非常方便，那大家是不是会好奇，我们写本文的目的？

原因是，**微信小程序上不支持 SVG 字体图标！😔 而多色图标，是需要借助 SVG 标签来实现。**

于是我在[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)找了好久，也只看到了 `<Image>` 组件能够使用 SVG，介绍如下：

> image图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式，2.3.0 起支持云文件ID。

其属性 `src` 的值为图片资源地址，这就意味着，不能使用 SVG 字体图标了。因此我们需要想想变通的办法。

（这里不讨论将 iconfont 上图标下载为图片来引用的情况）

### 2. 方案设计
既然我们了解了单色图标和多色图标的使用方式：

- 单色图标：任意标签（如 `div` 标签） + 对应字体图标 class 名称
- 多色图标：使用 `svg` 标签 + `use` 标签设置 `xlink:href` 属性

首先马上想到的是，能不能集合两者使用方式，实现任意标签通过 class 名称来使用多色图标？

答案是可以的，只需要对图标文件进行格式转换，即 **将多色字体图标转换为能通过class名称来引用的字体图标文件** 。

那接下来只要看看如何实现格式转换即可。

## 二、重构后的效果
这边我以其中一个页面进行重构，最后将单色图标全都换成新的多色 SVG 字体图标，效果如下：

![](https://images.pingan8787.com/image/svg-icon/2.png)

## 三、方案一：手动转换图标文件
目前我尝试了两套方案，并且都顺利实现效果，这边先分享一下这两种方案，然后再补充说明我选择哪个方案和原因：

该方案实现的是手动将字体图标库文件转换成能通过 class 名称来引用的图标库。
使用到的工具有：

1. icomoon：[https://icomoon.io/](https://icomoon.io/) 用来打包图标。
1. transfonter： [https://transfonter.org/](https://transfonter.org/) 用来生成 base64 格式的图标。


接下来开始试试：
### 步骤一：通过 iconfont 下载需要的 SVG 格式的图标

![](https://images.pingan8787.com/image/svg-icon/3.png)

这边多下载了几个，都是 svg 格式的文件，如下图：

![](https://images.pingan8787.com/image/svg-icon/4.png)

### 步骤二：打包字体图标
这一步是将零散个多个 SVG 多色图标打包成一个字体图标文件，这一步需要使用 [https://icomoon.io/](https://icomoon.io/)：

![](https://images.pingan8787.com/image/svg-icon/5.png)

![](https://images.pingan8787.com/image/svg-icon/6.png)

![](https://images.pingan8787.com/image/svg-icon/7.png)

![](https://images.pingan8787.com/image/svg-icon/8.png)

### 步骤三：字体图标进行 Base64 编码
接下来就需要将打好的字体图标进行 base64 压缩，这边使用[https://transfonter.org/](https://transfonter.org/)来操作。

第一步选择前面打好的包里面的 `.ttf` 文件：

![](https://images.pingan8787.com/image/svg-icon/9.png)

设置参数，并导出文件：

![](https://images.pingan8787.com/image/svg-icon/10.png)

### 步骤四：合并字体图标
经过前面几个步骤，我们现在已经有 2 个包：

- 第一个包：icomoon 生成的包

![](https://images.pingan8787.com/image/svg-icon/11.png)

- 第二个包：transfonter 生成的包

![](https://images.pingan8787.com/image/svg-icon/12.png)

接下来我们开始将两个包合并：
将第一个包 style.css 文件除 `@font-face` 的内容复制到第二个包 stylesheet.css 文件后面。

![](https://images.pingan8787.com/image/svg-icon/13.png)

这样就获得一份新的字体图标文件，其实也可以拷贝到一份新的 css 文件中。

### 使用字体图标
我们将前面修改后的文件改名为 `icon.scss` 并引入到项目：
```css
// app.scss

@import "./style/icon.scss";
```
代码中使用图标：
```jsx
<View className="icon-exe-knowledge-ppt">
  <View className='path1'></View>
  <View className='path2'></View>
  <View className='path3'></View>
  <View className='path4'></View>
  <View className='path5'></View>
  <View className='path6'></View>
</View>
```
最后效果如下：

![](https://images.pingan8787.com/image/svg-icon/14.png)

### 踩坑记录
在使用方案一的时候，踩了好几个坑，这边挑两个来说：

- 使用时，需要手动添加几个 `<View classname="path*"></View>` 元素

刚开始使用，图标一直没有出来，后面观察字体图标，它是在容器元素下很多个 `path1` 、 `path2` 等元素的伪类中去渲染图标内容：

![](https://images.pingan8787.com/image/svg-icon/15.png)

所以使用时需要手动添加一下。

- 默认图标会是一个大的块级元素，导致图标显示有问题

这是因为手动加的 class 为 `path*` 的 `View` 标签本身是块级元素，所以这里只要简单加个 `display: flex` 即可。

![](https://images.pingan8787.com/image/svg-icon/6.png)

并且其字体大小，也是可以使用 `font-size` 来设置：
```css
display: flex;
font-size: 100px;
```

### 抽取组件
考虑到复用性，我将这些抽成一个 `exe-svg-icon` 组件：
```jsx
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames';

function EXESvgIcon(params) {
  const { icon = 'exe-none' } = params;
  const containerStyle = {
    display: 'inline-block'
  }
  return (
    <View className={classNames('svg', icon)} style={containerStyle}>
      <View className='path1' style={containerStyle}></View>
      <View className='path2' style={containerStyle}></View>
      <View className='path3' style={containerStyle}></View>
      {/* 一般图标 3 层，这边多预留几层，防止不够用 */}
      <View className='path4' style={containerStyle}></View>
      <View className='path5' style={containerStyle}></View>
      <View className='path6' style={containerStyle}></View>
      <View className='path7' style={containerStyle}></View>
      <View className='path8' style={containerStyle}></View>
      <View className='path9' style={containerStyle}></View>
    </View>
  )
}
export default EXESvgIcon;

```
到这边，方案一实现完成。

## 四、方案二：借助第三方库实现
由于第一个方案使用起来比较繁琐，于是我又再研究其他简单点的方案。

直到我看到 [taro-iconfont-cli](https://gitee.com/mirrors/Taro-Iconfont) 这个库。

> 在Taro框架中使用iconfont图标，不依赖字体，支持多色彩。

目前支持平台包括：

- 微信小程序
- 支付宝小程序
- 百度小程序
- 头条小程序
- QQ小程序
- H5

有以下特性：

- 一键生成标准组件，多端支持
- 使用方便，import即可
- 支持多色彩
- 支持自定义颜色
- 支持 ES6 和 TypeScript 两种模式

按照文档描述，只需要 3 个步骤，那么试试看：

### 步骤一：安装 taro-iconfont-cli
```bash
# Yarn
yarn add taro-iconfont-cli --dev

# Npm
npm install taro-iconfont-cli --save-dev
```
需要注意的是，如果使用的是 Taro 2.x，请安装 **`**taro-iconfont-cli@2.1.0**`**，并阅读旧版的[README.md](https://github.com/iconfont-cli/taro-iconfont-cli/blob/v2.1.0/README.md)。

### 步骤二：生成配置文件
通过命令生成 iconfont.json 配置文件：
```bash
npx iconfont-init

# 可传入配置输出路径
# npx iconfont-init --output iconfont.json
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
  "symbol_url": "请参考README.md，复制 http://iconfont.cn 官网提供的JS链接",
  "save_dir": "./src/components/iconfont",
  "use_typescript": false,
  "platforms": "*",
  "use_rpx": true,
  "trim_icon_prefix": "icon",
  "default_icon_size": 18,
  "design_width": 750
}
```
`symbol_url` 值需要在 iconfont 中复制

![](https://images.pingan8787.com/image/svg-icon/17.png)

### 步骤三：生成 Taro 标准组件
通过命令，生成 Taro 标准组件：
```bash
npx iconfont-taro

# 可传入配置文件路径
# npx iconfont-taro --config iconfont.json
```
通过控制台，我们可以看到 taro-iconfont-cli 为每个图标单独生成一个 Taro 组件：

![](https://images.pingan8787.com/image/svg-icon/18.png)

![](https://images.pingan8787.com/image/svg-icon/19.png)

### 使用字体图标
按照文档使用方法，使用的时候，只需要引入 `IconFont` 组件，通过 `name` 名称来选择对应图标即可：
```jsx
// 省略其他代码

import IconFont from '@components/Iconfont/index';

<IconFont name="exe-knowledge-ppt"></IconFont>
```
按照文档提示，还有更多使用方法：
```jsx
// 原色彩
<IconFont name="alipay" />

// 单色：红色
<IconFont name="alipay" color="red" />

// 多色：红色+橘色
<IconFont name="alipay" color={['red', 'orange']} size={300} />

// 不同格式的颜色写法
<IconFont name="alipay" color={['#333', 'rgb(50, 124, 39)']} />

// 与文字对齐
<View style={{ display: 'flex', alignItems: 'center' }}>
  <Text>Hello</text>
  <IconFont name="alipay" />
</View>
```

### 踩坑记录

1. 字体大小设置问题

由于通过这种方式导出的图标，是个单独组件，使用时如果需要设置图标大小，需要通过设置其 `width`和`height`属性进行设置。

![](https://images.pingan8787.com/image/svg-icon/20.png)

通过 `font-size`属性无法设置字体图标的大小。
## 五、方案对比和选择
这次只尝试了这两种方案，都能顺利完成需求。如果大家有其他方案，欢迎一起评论区讨论~

接下来**以生成下面相同 20 个多色图标为标准，分析这两种方案：**

![](https://images.pingan8787.com/image/svg-icon/21.png)

先看看对比结果：

|  | **手动转换图标文件** | **借助 taro-iconfont-cli 库实现** |
| --- | --- | --- |
| **生成难易程度** | 复杂 | 简单 |
| **使用难易程度** | 简单 | 简单 |
| **资源占用程度** | 27kb | 420kb（项目未打包前） |

分析每个项目：
### 1. 对比生成难易程度

- 「手动转换图标文件」需要每次将图标单独下载，再进行打包，当图标数量较多，其工作量就较大。
- 「taro-iconfont-cli」只需设置字体图标库地址，自动下载并生成组件，较为方便。

### 2. 对比使用难易程度
两者使用起来都比较简单：

- 「手动转换图标文件」为元素添加 class 名称即可。
- 「taro-iconfont-cli」为元素添加 name 属性。
### 3. 对比资源占用情况
资源占用差异就很大了，分析下原因：

- 「手动转换图标文件」是将图标重新打包，最后生成的都是 base64 编码的内容，相对较小。
- 「taro-iconfont-cli」是为每个图标生成一个组件，单独一个文件，还有附加各个平台的文件，因此较大。
### 4. 选择方案
考虑到目前项目所使用的字体图标比较少（20 个以内），后续开发人员上手难度问题，我最终使用「taro-iconfont-cli」这套方案。
虽然这个方案生成的组件资源占用会稍大，但是目前使用图标较少，并且可以通过打包工具、CDN 等常用优化方式进行优化。

## 六、本文总结
本文通过一次简单的项目重构，总结项目中小程序使用 SVG 多色图标的方案，目的是为了实现在小程序中能够正常使用 SVG 多色图标，并且也为内容越来越多独立站点的项目积累经验，毕竟各个项目具有相关性。

最后，「taro-iconfont-cli」方案目前已经在内部 npm 仓库维护，采用版本控制，方便不同项目使用时减少冲突。

当然，本文是基于我的经验总结，欢迎大家有更好的方案，一起讨论学习~~

## 参考文章

- [微信小程序中使用svg字体图标教程 ——图解三步，很清晰](https://blog.csdn.net/Originally_M/article/details/106473475) 
- [Taro-Iconfont](https://gitee.com/mirrors/Taro-Iconfont) 