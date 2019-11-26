

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: "",
    selectedRoom: "DotaChat"
  },
  mutations: {
    SaveMessage (state, newMessage) {
      state.message = newMessage; 
    },
    SaveRooms (state, newRooms){
      state.selectedRoom = newRooms;
    }
  }
})


export default store