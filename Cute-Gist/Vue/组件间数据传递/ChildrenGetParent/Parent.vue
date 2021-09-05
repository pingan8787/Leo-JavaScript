<template>
    <div>
        <h2>子组件通过 $ref/$children 获取父组件属性/方法</h2>
        <Children @change='change' :params='params'/>
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
            params: {
                desc: 'from parent!',
                name: '前端自习课'
            },
            author: 'leo'
        }
    },
    methods:{
        change(){
            return "来自父组件的消息"
        }
    }
}
</script>