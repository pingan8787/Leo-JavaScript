## 一、GraphQL介绍
GraphQL 是 Facebook 开发的一种 **API 的查询语言**，与 2015 年公开发布，是 REST API 的替代品。      

GraphQL 既是一种用于 API 的**查询语言**也是一个满足你数据查询的**运行时**。 GraphQL 对你的 API 中的数据提供了一套易于理解的完整描述，使得客户端能够准确地获得它需要的数据，而且**没有任何冗余**，也让 API 更容易地随着时间推移而演进，还能用于构建强大的开发者工具。    

官网： http://graphql.org/
中文网： http://graphql.cn/

### 1. 特点

* 请求你所要的数据，不多不少；   

如：user 中有 name, age, address 等，可以只取得需要的字段。

* 获取多个资源，只用一个请求；   

典型的 REST API 请求多个资源时得载入多个 URL，而 GraphQL 可以通过一次请求就获取你应用所需的所有数据。这样也能保证在较慢的移动网络连接下，使用 GraphQL 的应用也能表现得足够迅速。   


* 描述所有可能类型的系统。便于维护，根据需求平滑演进，添加或隐藏字段；    

GraphQL 使用类型来保证应用只请求可能的数据，还提供了清晰的辅助性错误信息。应用可以使用类型，而避免编写手动解析代码。

### 2. 简单案例   

这里先看下简单的案例，体验下 GraphQL 的神奇之处。   
我们定义查询语句：   
```js
query {
    hello
    account {
        name
    }
}
```
然后得到的就是我们所要查询的 `hello` 和 `account` 对象下的 `name` 属性：    
```js
{
    "data": {
        "hello": "hello leo",
        "account": {
            "name": null
        }
    }
}
```

这样用起来，是不是更舒服呢？


## 二、GraphQL与restful对比

### 1. restful介绍   

全称：Representational State Transfer 表属性状态转移。    
本质上就是定义 uri ，通过 API 接口来取得资源。通用系统架构，不受语言限制。    

例子： 饿了吗接口。   
如：接口 `restapi/shopping/v3/restaurants?latitude=13` 就是个典型的 restful 接口，定义资源 + 查询条件。   

### 2. 与 GraphQL 比较

* restful 一个接口只能返回一个资源，GraphQL 一次可以获取多个资源。    

* restful 用不同 url 来区分资源，GraphQL 用类型区分资源。   


## 三、使用express构建基本helloworld

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

创建一个 `schema` 来定义查询语句和类型，`buildSchema()` 方法需要传入的参数是**字符串**类型，如下面的 `hello` 类似于查询的字段，后面的 `String` 类型表示字段返回的数据类型：   
```js
const schema = buildSchema(`
    type Query {
        hello: String
        account: Account
    }
`)
```

创建一个 `root` 处理器，处理对应的查询，这里的 `hello` 处理器对应的是 `schema` 中的 `hello` 字段查询的处理，这里直接返回 `hello leo` 的结果：   
```js
const root = {
    hello: () => {
        return 'hello leo'
    },
    account: () => {
        return {
            name: 'leo',
            age: 18,
            sex: '男'
        }
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

![1](http://images.pingan8787.com/graph_1.png)    

另外我们可以在 `graphiql` 界面右侧打开 **Docs** 查看我们定义的所有字段和描述信息。   

![2](http://images.pingan8787.com/graph_2.png)    

![3](http://images.pingan8787.com/graph_3.png)    


最终代码：    
```js
const express = require('express')
const { buildSchema } = require('graphql')
const graphqlHTTP = require('express-graphql')

// 构建schema，这里定义查询的语句和类型
const schema = buildSchema(`
    type Query {
        hello: String
        account: Account
    }
`)

// 定义查询所对应的 resolver，也就是查询对应的处理器
const root = {
    hello: () => {
        return 'hello leo'
    },
    account: () => {
        return {
            name: 'leo',
            age: 18,
            sex: '男'
        }
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



## 四、参数类型和参数传递


## 五、GraphQL客户端


## 六、使用Mutations修改数据


## 七、认证和中间件


## 八、ConstructingTypes


## 九、与数据库结合实战
