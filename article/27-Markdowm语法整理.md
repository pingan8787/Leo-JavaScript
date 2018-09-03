因为这些比较常用，所以就自己整理一份，方便查看。啊哈~~  

## 一、粗体和斜体
```
     *斜体*或_斜体_
     **粗体**
     ***加粗斜体***
     ~~删除线~~
```

## 二、分级标题
```
     这是一个一级标题
     ============================
     这是一个二级标题
     --------------------------------------------------
```
或者：
```
    # 一级标题
    ## 二级标题
    ### 三级标题
    #### 四级标题
    ##### 五级标题
    ###### 六级标题
```

## 三、超链接
```
1.行内式    
    欢迎来到[梵居闹市](http://blog.leanote.com/freewalk)
    欢迎来到[梵居闹市](http://blog.leanote.com/freewalk "梵居闹市")

2.参考式：
    我经常去的几个网站[Google][1]、[Leanote][2]以及[自己的博客][3]
    [Leanote 笔记][2]是一个不错的[网站][]。
    [1]:http://www.google.com "Google"
    [2]:http://www.leanote.com "Leanote"
    [3]:http://http://blog.leanote.com/freewalk "梵居闹市"
    [网站]:http://http://blog.leanote.com/freewalk
3.自动链接式
    <http://example.com/>
    <address@example.com>
```

## 四、锚点
```
    ## 0. 目录{#index}
    跳转到[目录](#index)
```

## 五、列表
```
1. 无序列表
使用 * + - 表示无序列表
    - 无序列表项 一
    - 无序列表项 二
    - 无序列表项 三

2. 有序列表
    1. 有序列表项 一
    2. 有序列表项 二
    3. 有序列表项 三

3. 定义型列表
定义型列表由名词和解释组成。一行写上定义，紧跟一行写上解释。解释的写法:紧跟一个缩进(Tab)
    Markdown
    :    轻量级文本标记语言，可以转换成html，pdf等格式（左侧有一个可见的冒号和四个不可见的空格）
    代码块 2
    :   这是代码块的定义（左侧有一个可见的冒号和四个不可见的空格）
            代码块（左侧有八个不可见的空格）
```

## 六、引用
```
    > 这是一个有两段文字的引用,
    > 无意义的占行文字1.
    > 无意义的占行文字2.
    >
    > 无意义的占行文字3.
    > 无意义的占行文字4.
```
多层引用：
```
    >>> 请问 Markdwon 怎么用？ - 小白
    >> 自己看教程！ - 愤青
    > 教程在哪？ - 小白
```


## 七、插入图像
```
1. 行内式
    美丽花儿：
    ![美丽花儿](http://ww2.sinaimg.cn/large/56d258bdjw1eugeubg8ujj21kw16odn6.jpg "美丽花儿")

2. 参考式
    美丽花儿：
    ![美丽花儿][flower]
    [flower]:http://ww2.sinaimg.cn/large/56d258bdjw1eugeubg8ujj21kw16odn6.jpg  "美丽花儿"
```

## 八、内容目录
在段落中填写 [TOC] 以显示全文内容的目录结构。

## 九、注脚
```
    使用 Markdown[^1]可以效率的书写文档, 直接转换成 HTML[^2], 你可以使用 Leanote[^Le] 编辑器进行书写。
    [^1]:Markdown是一种纯文本标记语言
    [^2]:HyperText Markup Language 超文本标记语言
    [^Le]:开源笔记平台，支持Markdown和笔记直接发为博文
```

## 十、LaTeX 公式
```
1. $ 表示行内公式：
    质能守恒方程可以用一个很简洁的方程式 $E=mc^2$ 来表达。
2. $$ 表示整行公式：
    $$\sum_{i=1}^n a_i=0$$
    $$f(x_1,x_x,\ldots,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2 $$
    $$\sum^{j-1}_{k=0}{\widehat{\gamma}_{kj} z_k}$$
```

## 十一、流程图
```
    flow
    st=>start: Start:>https://www.zybuluo.com
    io=>inputoutput: verification
    op=>operation: Your Operation
    cond=>condition: Yes or No?
    sub=>subroutine: Your Subroutine
    e=>end
    st->io->op->cond
    cond(yes)->e
    cond(no)->sub->io
```

## 十二、表格
```
简单方式：
    学号|姓名|分数
    -|-|-
    小明|男|75
    小红|女|79
    小陆|男|92

原生方式：
    |学号|姓名|分数|
    |-|-|-|
    |小明|男|75|
    |小红|女|79|
    |小陆|男|92|
为表格第二列指定方向：
    产品|价格
    -|-:
    Leanote 高级账号|60元/年
    Leanote 超级账号|120元/年
```

## 十三、分隔线
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：
```
    * * *
    ***
    *****
    - - -
    ---------------------------------------
```

## 十四、代码
```
1. 行内式：
    C语言里的函数 `scanf()` 怎么使用？

2. 缩进式多行代码
缩进 4 个空格或是 1 个制表符
一个代码区块会一直持续到没有缩进的那一行（或是文件结尾）。
        #include <stdio.h>
        int main(void)
        {
            printf("Hello world\n");
        }

3. 用六个`包裹多行代码
    ```
        #include <stdio.h>
        int main(void)
        {
            printf("Hello world\n");
        }
    、、、
```

## 十五、HTML 原始码
在代码区块里面， & 、 < 和 > 会自动转成 HTML 实体，这样的方式让你非常容易使用 Markdown 插入范例用的 HTML 原始码，只需要复制贴上，剩下的 Markdown 都会帮你处理
```
    <div class="footer">
       © 2004 Foo Corporation
    </div>

    <table>
        <tr>
            <th rowspan="2">值班人员</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
        </tr>
        <tr>
            <td>李强</td>
            <td>张明</td>
            <td>王平</td>
        </tr>
    </table>
```
