<template>
  <div class="hello">
    <div>Hello ListenersTemp!</div>
    <div><button @click="emitFn" >触发事件</button></div>
    <div>[getListeners.text]{{$attrs.name}}</div>
  </div>
</template>

<script>

export default {
  name: 'ListenersTemp',
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
      this.$emit('listener');
    }
  },
  mounted(){
    console.log("--this.$attrs--", this.$attrs);
  }
}
</script>
