<template>
    <div>
        <div>
            <div>传入 params：{{JSON.stringify(params)}}</div>
            <div>传入 author：{{author}}</div>
            <div><button @click="change">修改父组件 author</button></div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Children",
    props: {
        params: Object,
        author: String
    },
    data(){
        return {
            
        }
    },
    methods: {
        change(){
            this.$emit('changeAuthor', 'wangpingan')
        }
    }
}
</script>