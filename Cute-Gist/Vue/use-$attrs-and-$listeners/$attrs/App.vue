<template>
  <AttrsTemp v-bind="$attrs" name="leo" msg="Hello Vue in CodeSandbox!"></AttrsTemp>
</template>

<script>
import AttrsTemp from './components/AttrsTemp.vue';

export default {
  name: 'App',
  data() {
  },
  components: { AttrsTemp }
}
</script>
