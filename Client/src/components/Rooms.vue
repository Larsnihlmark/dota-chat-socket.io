
<template>
<div class="Room">
  <RoomsModal />
  <div class="RoomHeader">
    <h2>DotaChat</h2>
     <b-button v-b-modal.rooms-modal class="addRoomBtn"><font-awesome-icon :icon="['fas', 'plus']"/></b-button>
  </div>
  
    <div v-on:click="clickRoom('Admin')"> 
        <b-container class="containerRooms">
          <b-row>
            <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
            <b-col sm="4">#Admin</b-col>
          </b-row>
        </b-container>
    </div>

    <div v-on:click="clickRoom('General')">
      <b-container class="containerRooms">
          <b-row>
            <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
            <b-col sm="4">#General</b-col>
          </b-row>
      </b-container>
    </div>

    <div v-on:click="clickRoom('AFK')">
      <b-container class="containerRooms">
          <b-row>
            <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
            <b-col sm="4">#AFK</b-col>
          </b-row>
      </b-container>
    </div>

    <div v-on:click="clickRoom('Programming')">
      <b-container class="containerRooms">
        <b-row>
          <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
          <b-col sm="4">#Programming</b-col>
        </b-row>
      </b-container>
    </div>

    <div v-on:click="clickRoom('Dota')">
      <b-container class="containerRooms">
        <b-row>
          <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
          <b-col sm="4">#Dota</b-col>
        </b-row>
      </b-container>
    </div>

    <div v-on:click="clickRoom('Life')">
      <b-container class="containerRooms">
        <b-row>
          <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
          <b-col sm="4">#Life</b-col>
        </b-row>
      </b-container>
    </div>  
</div>
</template>

<script>
import store from '../Store/store';
import Vue from 'vue'
import RoomsModal from './RoomsModal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faPlus, faGrinBeam} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faVolumeUp, faPlus, faGrinBeam)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
export default {
  name: 'Rooms',

  data(){
    return{
      selectedRoom: ""
    }
  },
  components: {
    RoomsModal
  },
    methods: {
      clickRoom(roomsData){
        this.selectedRoom = roomsData;
        store.commit('SaveRooms', roomsData);
        // reset messages
        store.commit('resetMessages');
        // join room 
        this.$socket.client.emit('join-room', { room: this.selectedRoom, username: store.state.userName, password: "" });
      }, 
      showModal() {
        console.log('clicked');
        store.commit('showRoomModal', true);
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
.addRoomBtn {
  float: right;
  margin-top: -2.5em;
  margin-right: 0.2em;
}
/* .plusSquare{
  float: right;
  width: 20%;
  height: 18px;
  margin-top: -2.1em;
} */
.RoomHeader > div{
  padding: 2em;
  margin: 1em;
}
.containerRooms{
  margin:1em;
}
</style>