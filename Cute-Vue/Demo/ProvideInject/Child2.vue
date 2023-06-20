<script setup lang="ts">
import { inject, ref, reactive, readonly } from 'vue'
import { symbolNumberKey, symbolStringKey } from './key'

const name = inject('name', 'defaultName')
const age = inject('age', 20)
const user = inject('user', { name: '', age: 22 })
const userRef = inject('userRef', ref({ name: '', age: 22 }))
const userReactive = inject('userReactive', reactive({ name: '', age: 22 }))
const userReadonly = inject('userReadonly', readonly({ name: '', age: 22 }))
const symbolNumber = inject(symbolNumberKey)
const symbolString = inject(symbolStringKey)

const changeUserRef = () => {
  userRef.value.name = 'Child2 Ref Chris'
  userRef.value.age = 30
}
const changeUserReactive = () => {
  userReactive.name = 'Child2 Reactive Chris'
  userReactive.age = 30
}
const changeUserReadonly = () => {
  // @ts-ignore
  userReadonly.name = 'Child2 Readonly Chris'
  // @ts-ignore
  userReadonly.age = 30
}
</script>

<template>
  <div class="Child2">
    <div>Child Component 2</div>
    <button @click="changeUserRef">Update userRef</button>
    <button @click="changeUserReactive">Update userReactive</button>
    <button @click="changeUserReadonly">Update userReadonly</button>
    <div>name： {{ name }}</div>
    <div>age： {{ age }}</div>
    <div>user： {{ user.name }} / {{ user.age }}</div>
    <div>userRef： {{ userRef.name }} / {{ userRef.age }}</div>
    <div>userReactive： {{ userReactive.name }} / {{ userReactive.age }}</div>
    <div>userReadonly： {{ userReadonly.name }} / {{ userReadonly.age }}</div>
    <div>symbolString：{{ symbolString }}</div>
    <div>symbolNumber：{{ symbolNumber }}</div>
  </div>
</template>
<style>
.Child2 {
  background-color: #ffd7d3;
  width: 100%;
  padding: 8px;
  color: #000;
  box-sizing: border-box;
}
</style>
