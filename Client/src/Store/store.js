

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    message: "",
    selectedRoom: "DotaChat",
    userName: []
  },
  mutations: {
    SaveMessage (state, newMessage) {
      state.message = newMessage; 
    },
    SaveRooms (state, newRooms){
      state.selectedRoom = newRooms;
    },
    SaveUser (state,newUser){
      state.userName = newUser
    }
  }
})


export default store