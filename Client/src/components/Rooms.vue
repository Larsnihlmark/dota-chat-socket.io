
<template>
  <div class="Room">
  <div class="RoomHeader">
   
    <h2>DotaChat

    <!-- <font-awesome-icon @click="showModal" class="userPlus" :icon="['fas', 'user-plus']"/> -->
    </h2>
  </div>
    <div v-on:click="clickRoom('Admin')"> 
      <span>
        <p>
            <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Admin</p>
      </span>
    </div>
    <div v-on:click="clickRoom('General')">
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #General</p>
      </span>
    </div>
    <div v-on:click="clickRoom('SheitTalk')">
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #ShietTalk</p>
      </span>
    </div>
    <div v-on:click="clickRoom('Programming')">
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Programming</p>
      </span>
    </div>
    <div v-on:click="clickRoom('Dota')">
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Dota</p>
      </span>
    </div>
    <div v-on:click="clickRoom('Life')">
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Life</p>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import store from '../Store/store';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faUserPlus, faGrinBeam} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faVolumeUp, faUserPlus, faGrinBeam)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
export default {
  name: 'Rooms',

  data(){
    return{
      selectedRoom: ""
    }
  },
    methods: {
      clickRoom(roomsData){
        store.commit('SaveRooms', roomsData)
      }
    }
}
</script>

<style scoped>
.Room{
  width: 20%;
  background-color: #303136;
  float: left;
  height: 100vh;
  color: #fbfbfb;
}
.RoomHeader{
  /* padding: 1%; */
  border: 1px solid gray;
  background-color: #36393e;
}
.userPlus{
  float: right;
  width: 20%;
  height: 18px;
}
.RoomHeader > div{
  padding: 2em;
  margin: 1em;
}
</style>