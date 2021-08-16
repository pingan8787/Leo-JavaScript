<template>
  <div class="hello">
    <div>Hello ListenersTemp!</div>
    <button @click="emitFn">
      触发事件1
    </button>
    <ListenersTemp2 v-bind="$attrs" v-on="$listeners"></ListenersTemp2>
  </div>
</template>

<script>
import ListenersTemp2 from './ListenersTemp2.vue';

export default {
  name: 'ListenersTemp',
  components: { ListenersTemp2 },
  props:{ 
    msg: {
      type:String
    }
   },
  data() {
    return {
    }
  },
  methods: {
    emitFn(){
      this.$emit('listener1');
    }
  }
}
</script>
