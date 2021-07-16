## loader 配置

```js
{
    test: /\.js$/,
    use:[
        path.resolve('./loader/loader-a.js'),
        path.resolve('./loader/loader-b.js'),
        path.resolve('./loader/loader-c.js'),
        path.resolve('./loader/loader-async.js'),
        path.resolve('./loader/loader-pitch.js'),
        path.resolve('./loader/loader-raw.js'),
        path.resolve('./loader/loader-sync.js')
    ]
}
```

## 未启用 pitch loader 时的执行顺序

```bash
pitch A
pitch B
pitch C
pitch async
pitch raw
pitch sync
module sync
module raw
module async
module C
module B
module A
```

执行顺序如下：

pitch A  ->  pitch B  ->  pitch C  ->  pitch async  ->  pitch raw  ->  pitch sync
                                                                           |
                                                                          +++
module A  <- module B  <- module C  <- module async  <- module raw  <- module sync
   


## 启用 pitch loader 时的执行顺序

```bash
pitch A
pitch B
pitch C
pitch async
pitch pitch
module async
module C
module B
module A
```

执行顺序如下：

pitch A  ->  pitch B  ->  pitch C  ->  pitch async  ->  pitch pitch
                                                              |
                                                             +++
module A    <-    module B    <-     module C    <-     module async
   
