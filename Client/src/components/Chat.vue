<template>
  <div class="chatBox">
    <div v-for="message in this.messages" v-bind:key="message.msg">
      <SingleMessage v-bind:singleMessage="message.msg" v-bind:userName="message.userName" />
    </div>
      <p v-html="typing"></p>
  </div>
</template>

<script>
import store from '../Store/store';
import SingleMessage from './SingleMessage.vue';
export default {
  name: 'chat',
  data() {
    return {
      typing: ""
    }
  },
  components: {
    SingleMessage
  },
  created() {
    this.$socket.client.emit('join-room', { room: store.state.selectedRoom, username: store.state.userName,  password: "" });
  }, 
  computed: {
    messages: function(){
      return store.state.messages;
    }
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    ReciveMessage(messageData) {
      if (messageData.room === store.state.selectedRoom) {
        store.commit('addMessage', {
          msg: messageData.msg,
          userName: messageData.username
        });
      }
      this.typing = "";
    },
    TypingMessage(data){
      if (data.room === store.state.selectedRoom) {
        this.typing = '<p><em>' + data.username + ' is typing a message...</em></p>';
      }
        
    }
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
</style>