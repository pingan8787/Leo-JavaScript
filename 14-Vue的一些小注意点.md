## 介绍
最近用vuejs在写项目，就把一些遇到的小注意点记录下：

## 正文
### 1.组件间传递参数的this问题
从父组件传递给子组件的参数 需要在props中定义 并且在methods中调用需要加上this.
```
props: [
    'pageData'
],
methods:{
    console.log(this.pageData)   // 这里需要加this  但是注意在<template>里面不用，直接使用就可以
}
```

### 2.路由切换时执行的操作(如关闭定时器)
将切换路由要执行的函数写在destroyed()方法内。
[Vuejs生命周期](https://cn.vuejs.org/v2/guide/instance.html)
```
// 和mounted()同一级
destroyed(){
  clearInterval(this.COUNTTIMER1);
  clearInterval(this.COUNTTIMER2);
}
```

### 3.Vue日期选择器问题
Vue 的日期选择器等input框如果绑定一个函数，这个函数里面又有修改或初始化这个input的值的时候，则这个函数里面如果还有内部函数，则会在input值修改的时候又执行。

### 4.组件间传递参数读取的问题
父组件传递到子组件的所有参数，可以在子组件通过 `this.$props` 访问，如 `this.$props['openData']` 。

#### 5.动态引入图片的问题
先将图片通过 `require` 引入，
```
<template>
    <img :src="user_head_img" >
</template>
<scpirt>
    data(){
        return {
            user_head_img: require('../../assets/heade-img.png'),
        }
    }
</script>
```

### 6.关于__ob__的介绍
`__ob__`: Observer这些数据是vue这个框架对数据设置的监控器，一般都是不可枚举的。

### 7.favicon.icon 问题
直接放在项目根目录，在 `index.html` 中直接用这个路径即可，这是最简单粗暴好用的方法。

### 慢慢更新整理....