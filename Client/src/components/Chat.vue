<template>
<!-- hantering av meddelande boxen -->
  <div class="chatBox">
    <div v-for="message in this.messages" v-bind:key="message.msg">
      <SingleMessage v-bind:singleMessage="message.msg" v-bind:userName="message.userName" />
    </div>
      <p v-html="typing"></p>
      <p class="error">{{error}}</p>
  </div>
</template>

<script>
import store from '../Store/store';
import SingleMessage from './SingleMessage.vue';
export default {
  name: 'chat',
  data() {
    return {
      typing: "",
    }
  },
  components: {
    SingleMessage
  },
 /*  skickar upp till server */
  created() {
    this.$socket.client.emit('join-room', { room: store.state.selectedRoom, username: store.state.userName,  password: "" });
  }, 
  computed: {
    /* Vuex hantering av messages */
    messages: function(){
      return store.state.messages; 
    },
    /* Vuex hantering av error */
      error: function(){
        return store.state.error;
      }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    /* Hämtar från ReciveMessage */
    ReciveMessage(messageData) {
      if (messageData.room === store.state.selectedRoom) {
        store.commit('addMessage', {
          msg: messageData.msg,
          userName: messageData.username
        });
      }
      this.typing = "";    
    },
    /* Hämtar från server TypingMessage där vi skriver ut ett meddelande för hantering av någon skriver ska synas */
    TypingMessage(data){
      if (data.room === store.state.selectedRoom) {
        this.typing = '<p><em>' + data.username + ' is typing a message...</em></p>';
      }
    },
  }
}
</script>

<style scoped>

    .chatBox{
      display: flex;
      justify-content: flex-end;
      justify-items: end;
      flex-direction: column;
      width: 100%;
    }
    .error {
    color: rgb(255, 60, 60);
    font-weight: bold;
}
</style>