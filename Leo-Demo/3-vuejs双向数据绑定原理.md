## 数据双向绑定的原理
`Object.defineProperty()`  

vue实现数据双向绑定主要是：  
  采用数据劫持结合发布者-订阅者模式的方式，通过 `Object.defineProperty()` 来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 `data` 选项时，Vue 将遍历它的属性，用 `Object.defineProperty()` 将它们转为 `getter/setter`。用户看不到 `getter/setter`，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。  

vue的数据双向绑定 将MVVM作为数据绑定的入口，整合`Observer`，`Compile`和`Watcher`三者，通过`Observer`来监听自己的`model`的数据变化，通过`Compile`来解析编译模板指令（vue中是用来解析 {{}}），最终利用`watcher`搭起`observer`和`Compile`之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。   


## 简单实现
```html
<body>
    <div id="app">
        <input type="text" id="txt">
        <p id="show"></p>
    </div>
    <script type="text/javascript">
        var obj = {}  
        Object.defineProperty(obj, 'txt', {    
            get: function() {      
                return obj    
            },
                set: function(newValue) {      
                document.getElementById('txt').value = newValue
                document.getElementById('show').innerHTML = newValue    
            }  
        })
        document.addEventListener('keyup', function(e) {    
            obj.txt = e.target.value  
        })
    </script>
</body>
```