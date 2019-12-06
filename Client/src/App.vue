<template>
  <div id="app">
    <Sidebar/>
    <LoginModal/>
    <Main/>
    <Rooms/>
  </div>
</template>

<script>

import Sidebar from './components/Sidebar.vue';
import Rooms from './components/Rooms.vue';
import Main from './components/Main.vue';
import LoginModal from './components/LoginModal';

export default {
  name: 'app',
  components: {
    Sidebar,
    Rooms,
    Main,
    LoginModal
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  margin: 0;
}

</style>
