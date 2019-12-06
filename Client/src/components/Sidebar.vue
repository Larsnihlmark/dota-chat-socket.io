<template>
<!-- Hantering av username på vänster dian av sidan -->
  <div class="Sidebar">
    <div>
      <h3>Online</h3>
      <img class="SidebarImage" src="../assets/logo.png"><img>
      <span>Lars</span>
    </div>
    <div>
      <img class="SidebarImage" src="../assets/logo.png"><img>
      <span>Alex</span>
    </div>
    <div>
      <img class="SidebarImage" src="../assets/logo.png"><img>
      <span>{{userNames}}</span>
    </div>
  </div>
    
</template>

<script>
import store from '../Store/store';
export default {
  name: "SideBar",
  computed: {
    userNames: function(){
      return store.state.userName; //Hämtar från användareNamn från vuex store
    }
  }
}

</script>

<style scoped>
.Sidebar {
  width: 20%;
  background-color: #303136;
  float: right;
  height: 100vh;
  color: #2dcb70;
  
}
.SidebarImage{
  height: 2em;
}
</style>