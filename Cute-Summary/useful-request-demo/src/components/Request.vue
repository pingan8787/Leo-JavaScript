<template>
  <h1>{{ msg }}</h1>
  <div><button @click="send">发起请求</button></div>
</template>

<script setup>
import { reactive } from 'vue';
import request from './../request/index.js';

const state = reactive({ count: 0 })
const send = async () => {
  const result = await request({
    url: 'https://httpbin.org/headers',
    method: 'get'
  })
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
