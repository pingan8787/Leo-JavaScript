<template>
  <ListenersTemp v-on:listener="getListeners"> </ListenersTemp>
</template>

<script>
import ListenersTemp from "./components/ListenersTemp.vue";

export default {
  name: "App",
  data() {
    return {
      text: "Hello App",
    };
  },
  components: { ListenersTemp },
  methods: {
    getListeners() {
      console.log("--getListeners--", this.text);
    },
  },
};
</script>
