<template>
    <div>
        <div>
            <button @click='postMessage'>发布 Children2 事件</button>
        </div>
    </div>

</template>

<script>
export default {
    name: "Children2",
    data(){
        return {
        }
    },
    methods: {
        postMessage(){
            console.log('来自 Children2 事件')
        }
    }
}
</script>