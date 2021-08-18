<template>
<ListenersTemp 
  v-on:listener1="getListeners1"

  v-on:listener2="getListeners2"
>
</ListenersTemp>
</template>

<script>
import ListenersTemp from './components/ListenersTemp.vue';

export default {
  name: 'App',
  data() {
    return {
      text: 'Hello App'
    }
  },
  components: { ListenersTemp },
  methods:{
    getListeners1(){
      console.log('--1--', this.text)
    },
    getListeners2(){
      console.log('--2--', this.text)
    }
  }
}
</script>
