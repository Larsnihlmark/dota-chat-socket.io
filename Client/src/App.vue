<template>
  <div id="app">
    <Sidebar/>
    <Main/>
    <Rooms/>
  </div>
</template>

<script>

import Sidebar from './components/Sidebar.vue';
import Rooms from './components/Rooms.vue';
import Main from './components/Main.vue';


export default {
  name: 'app',
  components: {
    Sidebar,
    Rooms,
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
/*   flex-direction: column;
  justify-content: center;
  align-items: center; */
  
}
body{
  margin: 0;
}
</style>
