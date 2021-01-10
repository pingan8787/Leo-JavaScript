// 专门负责解析模板内容
class Compile {
    /**
     * @param {} 传递的选择器
     * @param {} Vue实例
     */
    constructor (el, vm) {
        // 如果用户直接给 el 赋值了一个 DOM 对象，这样也可以
        this.el = typeof el === 'string' ? document.querySelector(el) : el
        this.vm = vm

        // 编译模板内容（把插值表达式，指令都替换）
        if (this.el) {
            
            // 1.把el中所有的节点放到 fragment（文档碎片）
            let fragment = this.node2fragment(this.el)

            // 2.编译 fragment
            this.compile(fragment)

            // 3.把 fragment 的内容一次放到 DOM 中
            this.el.appendChild(fragment)
        }
    }

    /** 核心方法 */
    
    // 把我们的节点，转为 代码片段
    node2fragment(el) {

        let fragment = document.createDocumentFragment()

        // 把el中所有的子节点 挨个添加到 文档碎片中
        let childNodes = el.childNodes // 类数组
        this.toArray(childNodes).forEach(item => {
            fragment.appendChild(item) // 把el中所有的子节点 挨个添加到 文档碎片中
        })
        return fragment

    }

    /**
     * 编译文档碎片
     * @param {*} fragment 
     */
    compile(fragment) {
        let childNodes = fragment.childNodes // 拿到所有的子节点
        this.toArray(childNodes).forEach(node => {
            
            // 如果是 元素（标签），需要解析指令
            if (this.isElementNode(node)) {
                this.compileElement(node) // 解析元素（标签）节点
            }

            // 如果是文本节点，需要解析 插值表达式
            if (this.isTextNode(node)) {
                this.compileText(node) // 解析文本节点
            }

            // 如果当前节点还有子节点的时候，需要递归的判断
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }

        })
    }

    // 解析元素（标签）节点
    compileElement (node) {
        // 思路：所谓指令，就是 HTML 的一个 v 开头的特殊属性
        // 1.获取当前节点下所有的属性
        let attributes = node.attributes // 类数组
        this.toArray(attributes).forEach(attr => {
            
            let attrName = attr.name

            // 2.解析Vue的指令（ v- 开头的）
            if (this.isDirective(attr.nodeName)) {
                let type = attrName.slice(2)
                let attrValue = attr.value

                if (this.isEventDirective(type)) {
                    // 解析 v-on 指令
                    // 给当前元素注册事件
                    let eventType = type.split(':')[1] // 事件类型
                    node.addEventListener(eventType, this.vm.$methods[attrValue].bind(this.vm))    
                } else {
                    ComileUtil[type](node, this.vm, attrValue)
                }
            }

        })
    }

    // 解析文本节点
    compileText(node) {

        let txt = node.textContent
        let reg = /\{\{(.+)\}\}/
        if (reg.test(txt)) {
            let expr = RegExp.$1 // $1 拿到第一个分组
            node.textContent = txt.replace(reg, this.vm.$data[expr])

            new Watcher(this.vm, expr, (newValue, oldValue) => {
                node.textContent = txt.replace(reg, newValue)
            })
        }

    }



    /** 工具方法 */
    // 类数组 ---> 数组
    toArray (likeArray) {
        return [].slice.call(likeArray)
    }
    // 是否是元素节点 | 1：元素节点 | 3：文本节点
    isElementNode (node) {
        return node.nodeType === 1
    }
    isTextNode (node) {
        return node.nodeType === 3
    }
    // 是否是指令
    isDirective (attrName) {
        return attrName.startsWith('v-') // ES6 字符串方法，是否以某个开头
    }
    // 是否是一个事件指令 ：v-on:click 这样的
    isEventDirective (attrName) {
        return attrName.split(':')[0] === 'on'
    }
}

let ComileUtil = {

    // 处理 v-text 指令
    text (node, vm, attrValue) {
        node.textContent = vm.$data[attrValue]
        new Watcher(vm, attrValue, (newValue, oldValue) => {
            node.textContent = newValue
        })
    },

    // 解析 v-html 指令
    html (node, vm, attrValue) {
        node.innerHTML = vm.$data[attrValue]
        new Watcher(vm, attrValue, (newValue, oldValue) => {
            node.innerHTML = newValue
        })
    },

    // 解析 v-model 指令
    model (node, vm, attrValue) {
        node.value = vm.$data[attrValue]

        // 注册事件
        node.addEventListener('input', e => vm.$data[attrValue] = event.target.value)
        
        new Watcher(vm, attrValue, (newValue, oldValue) => {
            node.value = newValue
        })
    }
}