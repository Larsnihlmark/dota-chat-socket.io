
<template>
<!-- Hantering av room läggs höger om sidan -->
<div class="Room">
  <RoomsModal />
  <div class="RoomHeader">
    <h2>DotaChat</h2>
     <b-button v-b-modal="'rooms-modal'" class="addRoomBtn"><font-awesome-icon :icon="['fas', 'plus']"/></b-button>
  </div>
    <b-modal id="password-modal" ref="password-modal" body-bg-variant="dark"  bg-dark centered hide-footer hide-header title="Display Your Name">
      <div class="d-block text-center text-white bg-dark">
        <h3>Enter Password</h3>
      </div>
      <form ref="password-form" >
        <b-form-group
          class="text-white"
          label="Password *"
          label-for="password-input"
          invalid-feedback="Password is invalid"
          required
          >
          <b-form-input
            id="password-input"
            v-model="password"
          ></b-form-input>
        </b-form-group>
      </form>
      <b-button size="sm" class="mt-1" variant="success" block  @click="handleSubmit">Enter Room</b-button>
      <p class="error">{{this.error}}</p>
    </b-modal>
   <!--  Loppar igenom alla elementet rooms med v-for och vissar upp dom -->
    <div v-for="room in this.rooms"  v-bind:key="room.name" v-on:click="clickRoom(room.name)">
      <b-container class="containerRooms">
        <b-row>
          <b-col sm="3"><font-awesome-icon :icon="['fas', 'volume-up']"/></b-col>
          <b-col sm="4">{{room.name}}</b-col>
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
      selectedRoom: "",
      error: "",
      password: ""
    }
  },
  components: {
    RoomsModal
  },
    methods: {
      clickRoom(roomsData){
        // check if room has password
        this.selectedRoom = roomsData;
        this.$socket.client.emit('check-password', this.selectedRoom, (data) => {
          if (data === true) {
            // show modal
            this.$refs['password-modal'].show();
          } else {
            store.commit('SaveRooms', roomsData);
            // reset messages
            store.commit('resetMessages');
            // join room 
            this.$socket.client.emit('join-room', { room: this.selectedRoom, username: store.state.userName, password: "" });
          }
        });  
      }, 
      showModal() {
        store.commit('showRoomModal', true);
      },
      handleSubmit() {
            this.$socket.client.emit('join-room', { room: this.selectedRoom, username: store.state.userName, password: this.password }, (status) => {
                if(status === false) {
                    // display error
                    this.error = "Wrong password for " + this.selectedRoom;
                } else {
                  store.commit('SaveRooms', this.selectedRoom);
                  // reset messages
                  store.commit('resetMessages');
                  // join room 
                  this.$socket.client.emit('join-room', { room: this.selectedRoom, username: store.state.userName, password: this.password });
                  this.error = "";
                  return this.$refs['password-modal'].hide();
                }
            });
            this.$socket.client.emit('get-rooms', '', (data) => {
                store.commit('addRooms', data);
            });
      }
    },
    computed: {
      rooms: function(){
        return store.state.rooms;
      }
    },
    mounted() {
      this.$socket.client.emit('get-rooms', '', (data) => { //Hämtar alla rooms från socket när den har laddat in
          store.commit('addRooms', data);
      });
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
  border: 1px solid gray;
  background-color: #36393e;
}
.addRoomBtn {
  float: right;
  margin-top: -2.5em;
  margin-right: 0.2em;
}
.RoomHeader > div{
  padding: 2em;
  margin: 1em;
}
.containerRooms{
  margin:1em;
}
.error {
    color: red;
    font-weight: red;
}
</style>