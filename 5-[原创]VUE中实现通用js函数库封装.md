>本文作者：王平安（Leo） github：github.com/pingan8787
### 1、背景
最近在做公司的一个开奖网站项目，项目本身不难，但需要调用很多不同游戏类型的开奖倒计时接口等，由于本身使用vue开发，使得组件文件看起来很多，在这么多文件中，如果每个组件中需要调用接口时才写这个方法，说真的不易于以后接口维护，所以我就将所有ajax请求封装的方法封装在一个库里，调用的时候引用一下就ok。  
本人新手，如果写得不好，欢迎评论指导。  
### 2、代码实现
#### a.安装axios： 
```
//安装axios
npm install axios
```
#### b.引入axios： 
```
//引入axios
// .src\main.js
import axios from 'axios'

Vue.prototype.$ajax = axios; //将axios设置到全局上
```
#### c.文件创建：  
```
创建接口文件：.\src\assets\js\api.js  
创建组件文件：  .\src\components\tools.vue
```
#### d.编辑api.js
这边由于`api.js`中会封装很多方法在里面，所有使用export单独暴露方法。
```
//api.js
export function GETTREND(data){
    let url = 'http://www.testurl.com';
    data.that.$ajax({  //由于在api.js中读取不到组件中的this,即vue实例,所以需要手动传入,这里已经先封装到data中
        methods:'GET',
        url:url
    }).then((response)=>{
        return response;//执行成功操作
    })
}
```
#### e.编辑tools.js
```
//tools.js
import { GETTREND } from '../../assets/js/api.js';//引入文件
export default {
    data(){
        return {
            tableData:{}
        }
    },
    created(){
        let that = this;
        that.tableData={
            gamename:'leo',
            that:that
        };
        that.getTable();
    },
    methods:{
        getTable(){
            let that = this;
            GETTREND(that.tableData).then((data)=>{
                console.log(data);//成功发起和获取到api.js请求所返回的结果
            })
        }
    }
}
```
#### f.另外
上面这个是个简单的封装方法，其实也可以在api.js里面写一些业务逻辑的方法，不需要直接暴露出来，而是在需要暴露的方法中使用，提高代码可读性。

