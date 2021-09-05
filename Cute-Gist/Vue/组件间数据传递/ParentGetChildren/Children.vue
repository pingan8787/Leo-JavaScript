<template>
    <div>
    </div>

</template>

<script>
export default {
    name: "Children",
    props: {},
    data(){
        return {
            message: "来自子组件的信息",
        }
    },
    methods: {
        childrenFun (){
            console.log('来自子组件的方法')
        }
    }
}
</script>