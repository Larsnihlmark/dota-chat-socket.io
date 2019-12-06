<template>
<!-- Behållarna för mitten av sidan chat och chatinput tar den in -->
  <div class="Main">
    <div class="Title" v-on:>
      <h2>{{titleSelectedRoom}}</h2>
    </div>
    <Chat/>
    <ChatInput/>
  </div>
</template>

<script>
import ChatInput from './ChatInput';
import Chat from './Chat';
import store from '../Store/store';
export default {
  name:'Main',
  components: {
    ChatInput,
    Chat
  },
  computed: {
    titleSelectedRoom: function(){ // Räkna ut vilket rum genom Vuex state
      return store.state.selectedRoom;
    }
  }
}
</script>

<style scoped>
.Main{
  background-color: #36393e;
  width: 60%;
  float:right;
  height: 100vh;
  color: #fbfbfb;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

}
.Title{
  z-index: 90;
  background-color: #36393e;
  border-bottom: 3px solid #303136;
  position: absolute;
  width: 60%;
  right: 20%;
  top: 0em;
}

</style>