<template>
    <div>
        <div>
            <div>父组件名称：{{parentTitle}}</div>
            <div><button @click="change">修改父组件 author</button></div>
            <Children2 />
        </div>
    </div>

</template>

<script>
import Children2 from './Children2.vue';
export default {
    name: "Children",
    props: {
        params: Object,
        author: String
    },
    components: { Children2 },
    inject:['parentTitle'],
    data(){
        return {
            
        }
    },
    methods: {
        change(){
            console.log('[Children parentTitle]',this.parentTitle)
        }
    }
}
</script>