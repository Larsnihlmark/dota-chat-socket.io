

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    messages: [],
    selectedRoom: "General",
    userName: "---",
    showRoomModal: false,
    showPasswordModal: false
  },
  mutations: {
    SaveMessage(state, newMessage) {
      state.message = newMessage; 
    },
    SaveRooms(state, newRooms){
      state.selectedRoom = newRooms;
    },
    SaveUser(state,newUser){
      state.userName = newUser;
    },
    showRoomModal(state, newState) {
      state.showRoomModal = newState;
    },
    showPasswordModal(state, newState) {
      state.showPasswordModal = newState;
    },
    addMessage(state, newMessage) {
      state.messages.push(newMessage);
    },
    resetMessages(state) {
      state.messages = [];
    }
  }
})


export default store