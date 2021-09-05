<template>
    <div>
        <div>
            <Children2 v-bind='$attrs' v-on='$listeners'/>
            <button @click="getChildren2">获取 Children2 组件信息</button>
        </div>
    </div>

</template>

<script>
import Children2 from './Children2.vue';
export default {
    name: "Children",
    components: {Children2},
    data(){
        return {
            parentMessage: '还未获取到父组件消息'
        }
    },
    methods: {
        getChildren2(){
            console.log('[$attrs]', this.$attrs)
            console.log('[$listeners]', this.$listeners)
        }
    }
}
</script>