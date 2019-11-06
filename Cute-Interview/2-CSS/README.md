### 1. 移动端适配1px的问题

1. 局部处理
`meta` 标签中的 `viewport` 属性 ，`initial-scale` 设置为 `1 rem` 按照设计稿标准走，外加利用 `transfrome` 的 `scale(0.5)` 缩小一倍即可；

2. 全局处理
`meta` 标签中的 `viewport` 属性 ，`initial-scale` 设置为 `0.5 rem` 按照设计稿标准走即可。

### 2. 介绍flex布局

### 3. CSS 方式设置垂直居中

### 4. 介绍css3中position:sticky

### 5. 介绍position属性包括CSS3新增

### 6. 介绍css，xsrf

### 7. xsrf跨域攻击的安全性问题怎么防范

### 8. 盒子模型，以及标准情况和IE下的区别

### 9. rem、flex的区别（root em）/em和px的区别

### 10. 什么是重排和重绘，什么情况会触发重排和重绘？

### 11. 单行 / 多行文本溢出显示...

* 单行：

```css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

* 多行：

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

`-webkit-line-clamp` 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 `WebKit` 属性。常见结合属性：

1、`display: -webkit-box;` 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
2、`-webkit-box-orient` 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 

### 