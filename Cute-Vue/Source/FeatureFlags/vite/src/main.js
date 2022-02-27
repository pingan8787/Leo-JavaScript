import { createApp } from 'vue'
import App from './App.vue'

const name = 'pingan8787';
const age = 18;

const featureFlags = () => {
    console.warn(name)
    __DEV__ && console.log(name)
}

featureFlags();

createApp(App).mount('#app')
