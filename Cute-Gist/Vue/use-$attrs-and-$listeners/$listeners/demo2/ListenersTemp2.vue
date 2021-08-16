<template>
  <div class="hello">
    <div>Hello ListenersTemp!</div>
    <button @click="emitFn">
      触发事件2
    </button>
    <div>[getListeners.text]{{$attrs.name}}</div>
  </div>
</template>

<script>

export default {
  name: 'ListenersTemp2',
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
      this.$emit('listener2');
    }
  },
  mounted(){
    console.log("--this.$attrs--", this.$attrs);
  }
}
</script>
