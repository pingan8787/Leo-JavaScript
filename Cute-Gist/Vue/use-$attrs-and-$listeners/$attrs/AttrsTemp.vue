<template>
  <div class="hello">
    <div>Hello AttrsTemp!</div>
    <div>[msg]{{msg}}</div>
    <div>[$attrs.name]{{$attrs.name}}</div>
  </div>
</template>

<script>

export default {
  name: 'AttrsTemp',
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
  },
  mounted(){
    console.log("--this.$attrs--", this.$attrs);
  }
}
</script>
