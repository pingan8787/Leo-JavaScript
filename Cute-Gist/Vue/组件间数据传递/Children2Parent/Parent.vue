<template>
    <div>
        <h1>子组件 -> 父组件（this.$emit）</h1>
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