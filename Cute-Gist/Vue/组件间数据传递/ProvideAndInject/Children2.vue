<template>
    <div>
        <div>
            <div>父组件名称：{{parentTitle}}</div>
            <div><button @click="change">修改父组件 author</button></div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Children2",
    inject:['parentTitle'],
    data(){
        return {
            
        }
    },
    methods: {
        change(){
            console.log('[Children2 parentTitle]',this.parentTitle)
        }
    }
}
</script>