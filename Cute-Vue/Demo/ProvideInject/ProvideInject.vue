<script setup lang="ts">
import { provide, ref, reactive, readonly } from 'vue'
import Child1 from './Child1.vue'
import { symbolNumberKey, symbolStringKey } from './key'

const user = {
  name: 'Chris',
  age: 18
}
const userRef = ref({
  name: 'Chris',
  age: 18
})
const userReactive = reactive({
  name: 'Chris',
  age: 18
})
const userReadonly = readonly({
  name: 'Chris',
  age: 18
})

provide('name', 'Chris')
provide('age', 18)
provide('user', user)
provide('userRef', userRef)
provide('userReactive', userReactive)
provide('userReadonly', userReadonly)
provide(symbolStringKey, 'Chris')
provide(symbolNumberKey, 18)

const changeUser = () => {
  user.name = 'New Chris'
  user.age = 30
}
const changeUserRef = () => {
  userRef.value.name = 'Ref Chris'
  userRef.value.age = 30
}
const changeUserReactive = () => {
  userReactive.name = 'Reactive Chris'
  userReactive.age = 30
}
const changeUserReadonly = () => {
  // @ts-ignore
  userReadonly.name = 'Readonly Chris'
  // @ts-ignore
  userReadonly.age = 30
}
</script>

<template>
  <div class="ProvideInject">
    <div>Root Component</div>
    <button @click="changeUser">Update user</button>
    <button @click="changeUserRef">Update userRef</button>
    <button @click="changeUserReactive">Update userReactive</button>
    <button @click="changeUserReadonly">Update userReadonly</button>
    <div>user： {{ user.name }} / {{ user.age }}</div>
    <div>userRef： {{ userRef.name }} / {{ userRef.age }}</div>
    <div>userReactive： {{ userReactive.name }} / {{ userReactive.age }}</div>
    <div>userReadonly： {{ userReadonly.name }} / {{ userReadonly.age }}</div>
    <Child1></Child1>
  </div>
</template>
<style>
.ProvideInject {
  background-color: #ffc3a0;
  width: 500px;
  padding: 8px;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
}
</style>
