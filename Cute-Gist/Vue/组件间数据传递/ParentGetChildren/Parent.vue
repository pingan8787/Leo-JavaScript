<template>
    <div>
        <h2>父组件通过 $ref/$children 获取子组件属性/方法</h2>
        <Children ref='childComponent'/>
        <button @click='getChildrenForRefs'>$refs获取子组件</button>
        <button @click='getChildrenForChildren'>$refs获取子组件</button>
        <div>{{childrenMessage}}</div>
    </div>
</template>

<script>
import Children from './Children.vue';

export default {
    name: "Parent",
    components: {
        Children
    },
    data(){
        return {
            childrenMessage: '还未收到子组件消息'
        }
    },
    methods: {
        getChildrenForRefs(){
            const { message, childrenFun } = this.$refs.childComponent;
            this.childrenMessage = message;
            childrenFun();
        },
        getChildrenForChildren(){
            const { message, childrenFun } = this.$children[0];
            this.childrenMessage = message;
            childrenFun();
        }
    }
}
</script>