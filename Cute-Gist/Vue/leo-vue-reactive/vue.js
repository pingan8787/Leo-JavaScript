class Vue {
    constructor (options = {}) {
        this.$el = options.el;
        this.$data = options.data();
        this.$methods = options.methods;

        // [核心流程]将普通 data 对象转换为响应式对象
        new Observer(this.$data);

        if (this.$el) {
            // [核心流程]将编译模板的内容
            new Compile(this.$el, this)
        }
    }
}

window.Vue = Vue;