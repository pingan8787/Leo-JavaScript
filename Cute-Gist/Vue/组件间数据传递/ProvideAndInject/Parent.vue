<template>
    <div>
        <h1>父组件 -> 子孙组件（provide 和 inject）</h1>
        <Children :params="params" :author="author" @changeAuthor='change'/>
    </div>
</template>

<script>
import Children from './Children.vue';

export default {
    name: "Parent",
    components: {
        Children
    },
    provide(){
        return {
            parentTitle: this.params
        }
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
        change(data){
            this.author = data
        }
    }
}
</script>