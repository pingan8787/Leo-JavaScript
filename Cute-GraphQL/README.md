# 看完复联四，我整理了这份 GraphQL 入门教程

## 首先有请阿爸镇贴！哈哈哈

![iron_man](http://images.pingan8787.com/iron_man.jpg)   

## 一、GraphQL介绍
`GraphQL` 是 Facebook 开发的一种 **API 的查询语言**，与 2015 年公开发布，是 REST API 的替代品。      

`GraphQL` 既是一种用于 API 的**查询语言**也是一个满足你数据查询的**运行时**。 `GraphQL` 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且**没有任何冗余**，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。    

官网： http://graphql.org/   
中文网： http://graphql.cn/

### 1. 特点

* 请求你所要的数据，不多不少；   

如：`hero` 中有 `name`, `age`, `sex` 等，可以只取得需要的字段。

* 获取多个资源，只用一个请求；   

典型的 `REST API` 请求多个资源时得载入多个 URL，而 `GraphQL` 可以通过一次请求就获取你应用所需的所有数据。这样也能保证在较慢的移动网络连接下，使用 `GraphQL` 的应用也能表现得足够迅速。   


* 描述所有可能类型的系统。便于维护，根据需求平滑演进，添加或隐藏字段；    

`GraphQL` 使用类型来保证应用只请求可能的数据，还提供了清晰的辅助性错误信息。应用可以使用类型，而避免编写手动解析代码。

### 2. 简单案例   

这里先看下简单的案例，体验下 `GraphQL` 的神奇之处。   
我们定义查询语句：   
```js
query {
    hero
}
```
然后得到的就是我们所要查询的 `hero` 字段：    
```js
{
    "data": {
        "hero": "I'm iron man"
    }
}
```

这样用起来，是不是更舒服呢？


## 二、GraphQL与restful对比

### 1. restful介绍   

全称：`Representational State Transfer` 表属性状态转移。    
本质上就是定义 uri ，通过 API 接口来取得资源。通用系统架构，不受语言限制。    

例子： 饿了吗接口。   
如：接口 `restapi/shopping/v3/restaurants?latitude=13` 就是个典型的 `restful` 接口，定义资源 + 查询条件。   

### 2. 与 GraphQL 比较

* `restful` 一个接口只能返回一个资源，`GraphQL `一次可以获取多个资源。    

* `restful` 用不同 url 来区分资源，`GraphQL` 用类型区分资源。   


## 三、使用express构建基本helloworld

### 1. 简单案例

初始化一个 `package.json`，并且安装 `express` / `graphql` / `express-graphql` ：   
```bash
npm init -y
npm install express graphql express-graphql -S
```

新建一个 `hello.js`，引入文件：   
```js
const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')
```

创建一个 `schema` 来定义查询语句和类型，`buildSchema()` 方法需要传入的参数是**字符串**类型，如下面的 `hero` 查询字段，后面的 `String` 类型表示字段返回的数据类型：   
```js
const schema = buildSchema(`
    type Query {
        hero: String
    }
`)
```

创建一个 `root` 处理器，处理对应的查询，这里的 `hello` 处理器对应的是 `schema` 中的 `hero` 字段查询的处理，这里直接返回 `I'm iron man` 的结果：   
```js
const root = {
    hero: () => {
        return "I'm iron man"
    }
}
```

当然，处理器中也可以是其他复杂操作，后面会介绍。   

然后实例化 `express` ，并且将路由转发给 `graphqlHTTP` 处理：   
```js
const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))
app.listen(3000)
```
`graphqlHTTP` 中的三个参数介绍：   
* `schema`：定义的查询语句和类型   
* `rootValue`：处理对应查询的处理器    
* `graphiql`：是否开启调试窗口，开发阶段开启，生产阶段关闭

接下来运行项目，在命令行中执行 `node hello.js`，这里可以在 `graphiql` 上做调试，打开地址 `localhost:3000/graphiql` 就可以愉快的查询了。     

![1](http://images.pingan8787.com/graphql_1.png)    

另外我们可以在 `graphiql` 界面右侧打开 **Docs** 查看我们定义的所有字段和描述信息。   

![2](http://images.pingan8787.com/graphql_2.png)    

![3](http://images.pingan8787.com/graphql_3.png)    


最终代码：    
```js
const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 构建schema，这里定义查询的语句和类型
const schema = buildSchema(`
    type Query {
        hero: String
    }
`)

// 定义查询所对应的 resolver，也就是查询对应的处理器
const root = {
    hero: () => {
        return "I'm iron man"
    }
}

const app = express()

// 将路由转发给 graphqlHTTP 处理
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3000)
```

### 2. 自定义类型查询

我们前面的查询中，已经将 `hero` 字段定义为 `String` 类型，但是常常开发中，我们又会碰到字段是多个类型，即**字段也能指代对象类型（Object）**，比如一个 `user` 字段会有 `name` 、`age` 等字段，而 `name` 返回字符串类型，`age` 返回数值类型。    

这时候，我们可以对这个对象的字段进行**次级选择（sub-selection）**。GraphQL 查询能够遍历相关对象及其字段，使得客户端可以一次请求查询大量相关数据，而不像传统 REST 架构中那样需要多次往返查询。

我们可以新建一个查询类型来定义 `user` 字段返回的类型：  
```js
const schema = buildSchema(`
    type User {
        # 查询可以有备注！
        name: String
        age: Int
    }
    type Query {
        hero: String
        user: User
    }
`)
```

在处理器中我们也要加上：   
```js

const root = {
    hero: () => {
        return "I'm iron man"
    },
    user: () => {
        return {
            name: 'leo',
            age: 18
        }
    }
}
```
**这边 Int/String 参数类型的问题，下一章介绍**    

## 四、参数类型和参数传递

### 1. 基本参数类型
`String`, `Int`, `Float`, `Boolean` 和 `ID`，这些基本参数类型可以在 `schema` 声明中直接使用。   

* `Int`：有符号 32 位整数。  
* `Float`：有符号双精度浮点值。  
* `String`：`UTF‐8` 字符序列。   
* `Boolean`：`true` 或者 `false`。   
* `ID`：`ID` 标量类型表示一个**唯一标识符**，通常用以重新获取对象或者作为缓存中的键。`ID` 类型使用和 `String` 一样的方式序列化；然而将其定义为 `ID` 意味着并**不需要人类可读型**。


另外，我们可以使用 `[类型]` 来表示一类数组，如：   
* `[Int]` 表示整型数组；    
* `[String]` 表示字符串型数组；   

### 2. 参数传递

使用方式和 JS 参数传递一样，小括号内定义形参，但是**参数需要定义类型**。    

使用 `!` 代表参数不能为空。  

下面案例：参数 `teamName` 是 `String` 类型，必须传递，而 `number` 参数也是 `Int` 类型，但是是非必须传递，最后输出的结果也是 `String` 类型。   

```js
type Query {
    getHero(teamName: String!, number: Int): [String]
}
```

下面一个案例：    

```js
//...省略其他
const schema = buildSchema(`
    type Query {
        getHero(teamName: String!): [String]
    }
`)

const root = {
    getHero: ({teamName}) => {
        // 这里的操作 实际开发中常常用在请求数据库
        const hero = {
            '三国': ['张飞', '刘备', '关羽'],
            '复仇者联盟': ['钢铁侠', '美国队长', '绿巨人']
        }
        return hero[teamName]
    }
}
//...省略其他
```
这时候我们在 **GraphiQL** 上输入查询，就会得到 **复仇者联盟** 的英雄数据了。    
```js
// 查询
query {
	getHero(teamName:"复仇者联盟")
}

// 结果
{
    "data": {
        "getHero": [
            "钢铁侠",
            "美国队长",
            "绿巨人"
        ]
    }
}
```

### 3. 自定义返回类型

在实际开发中，我们返回的数据类型可能是一个对象，对象中可能既有 `Int` 类型的属性，也有 `String` 类型的值，等等，这里我们可以使用 **自定义返回类型** 来处理：   

```js
//...省略其他
const schema = buildSchema(`
    type Hero {
        name: String
        age: Int
        doSomething(thing: String): String
    }
    type Query {
        getSuperHero(heroName: String!): Hero
    }
`)
const root = {
    getSuperHero: ({heroName}) => {
        // 这里的操作 实际开发中常常用在请求数据库
        const name = heroName
        const age = 18
        const doSomething = ({thing}) => {
            return `I'm ${name}, I'm ${thing} now`
        }
        return { name, age, doSomething }
    }
}
//...省略其他
```

这里指定了 `getSuperHero` 字段的返回类型是 `Hero` 类型，随后在上面定义了 `Hero`。    

其中 `Hero` 类型中的 `doSomething`也是可以传递指定类型参数，并且指定返回类型。   

下面看下输出情况：    


```js
// 查询
query {
	getSuperHero(heroName:"IronMan") {
        name
        age
        doSomething
	}
}

// 结果
{
    "data": {
        "getSuperHero": {
            "name": "IronMan",
            "age": 46,
            "doSomething": "I'm IronMan, I'm undefined now"
        }
    }
}
```

这里也可以给 `doSomething` 传递参数，就会获取到不同结果：   
```js
// 查询
query {
	getSuperHero(heroName:"IronMan") {
        name
        age
	    doSomething(thing:"watching TV")
	}
}

// 结果
{
    "data": {
        "getSuperHero": {
            "name": "IronMan",
            "age": 46,
            "doSomething": "I'm IronMan, I'm watching TV now"
        }
    }
}
```

## 五、GraphQL客户端

这一节我们学习如何在客户端中访问 `graphql` 的接口。     

### 1. 后端定义接口
我们先在后端将接口开发完成，这里跟前面差不多，但需要多一步，使用 `express` 向外暴露一个文件夹，供用户访问静态资源文件：   

**这里直接使用前一节的代码啦~**    
```js
// index.js  开发 graphql 接口
//...省略其他
const schema = buildSchema(`
    type Hero {
        name: String
        age: Int
        doSomething(thing: String): String
    }
    type Query {
        getSuperHero(heroName: String!): Hero
    }
`)
const root = {
    getSuperHero: ({heroName}) => {
        // 这里的操作 实际开发中常常用在请求数据库
        const name = heroName
        const age = 46
        const doSomething = ({thing}) => {
            return `I'm ${name}, I'm ${thing} now`
        }
        return { name, age, doSomething }
    }
}
const app = express()
app.use('/graphql', graphqlHTTP({
    schema, rootValue: root, graphiql: true
}))
// 公开文件夹 使用户访问静态资源
app.use(express.static('public'))
app.listen(3000)
```
这样我们就给前端页面提供一个可以访问静态资源的功能。   

这里还需要在根目录创建一个 **public** 文件夹，并在文件夹中添加 `index.html` 文件，此时的目录结构：   
```
|-node_modules
|-public
|---index.html
|-index.js
|-package.json
```

### 2. 前端页面请求

然后给 `index.html` 添加按钮和事件绑定：    

这里的变量 `query` 是个**字符串类型**，定义查询条件，在条件 `GetSuperHero` 中的参数，需要用 `$` 符号来标识，并在实际查询 `getSuperHero` 中，作为参数的参数类型设置进来。    

然后定义变量 `variables` ，指定属性的值，之后通过 `fetch` 发起请求：   

```html
<button onclick="getData()">获取数据</button>
<script>
function getData(){
    const query = `
        query GetSuperHero($heroName: String, $thing: String){
            getSuperHero(heroName: $heroName){
                name
                    age
                    doSomething(thing: $thing)
            }
        }
    `
    // 如果不需要其他参数 至少要传一个参数 否则会报错
    // const query = `
    //     query GetSuperHero($heroName: String){
    //         getSuperHero(heroName: $heroName){
    //              name
    //         }
    //     }
    // `    
    const variables = {heroName: '钢铁侠', thing: 'watching TV'}

    fetch('./graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query, variables
        })
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
    })
}
</script>
```

当我们写完以后，点击 **获取数据** 就会在控制台打印下面的数据：    
```js
{
    "data":{
        "getSuperHero":{
            "name":"钢铁侠",
            "age":46,
            "doSomething": "I'm 钢铁侠, I'm watching TV now"
        }
    }
}
```

### 3. 注意点

* 请求中的 `query` 参数需要对照好有 `$` 符号的变量。   

查询语句 `query GetSuperHero($heroName: String)` 里参数 `$heroName` 中的 `heroName` ；     
查询语句 `getSuperHero(heroName: $heroName)`  里类型 `$heroName` 中的 `heroName` ；   
变量 `variables` 中的 `heroName` 属性；   

**这三个名称需要一样**。   

* 请求中需要将数据**序列化操作**。   

```js
body: JSON.stringify({ query, variables })
```

## 六、使用Mutations修改数据


## 七、认证和中间件


## 八、ConstructingTypes


## 九、与数据库结合实战
