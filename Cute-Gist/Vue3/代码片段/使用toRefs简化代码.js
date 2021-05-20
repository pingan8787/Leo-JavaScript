// 使用 toRefs 前

/*
<template>
  <div class="hello">
    <h3>{{leo.name}}/{{leo.age}}/{{leo.left}}</h3>
  </div>
</template>
*/
import { reactive, computed, toRefs } from 'vue'

export default {
  name: 'DemoSetup',
  setup (props) {
    const leo = reactive({
      name: 'leo',
      age: 18,
      left: computed(() => {
        return leo.age + 10
      })
    })
    return {
      leo
    }
  }
}

// 使用 toRefs 后


/*
<template>
  <div class="hello">
    <h3>{{name}}/{{age}}/{{left}}</h3>
  </div>
</template>
*/
import { reactive, computed, toRefs } from 'vue'

export default {
  name: 'DemoSetup',
  setup (props) {
    const leo = reactive({
      name: 'leo',
      age: 18,
      left: computed(() => {
        return leo.age + 10
      })
    })
    return {
      ...toRefs(leo)
    }
  }
}