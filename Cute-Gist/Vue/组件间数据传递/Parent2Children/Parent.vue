<template>
    <div>
        <h1>父组件 -> 子组件（props参数）</h1>
        <Children :params="params" author="leo"/>
    </div>
</template>

<script>
// 父组件通过 props 传递给子组件

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
            }
        }
    }
}
</script>