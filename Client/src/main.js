import Vue from 'vue'
import App from './App.vue'

import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


const socket = io('http://localhost:8000');

Vue.use(BootstrapVue);
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
