<template>
    <div>
        <div>
            <div>传入 params：{{JSON.stringify(params)}}</div>
            <div>传入 author：{{author}}</div>
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
    }
}
</script>