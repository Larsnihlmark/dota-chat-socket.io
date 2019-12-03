<template>
  <div class="chatBox">
    <div v-for="message in messages" v-bind:key="message.msg">
      <SingleMessage v-bind:singleMessage="message.msg" v-bind:userName="message.userName" />
    </div>
      <p v-html="typing"></p>
  </div>
</template>

<script>

import SingleMessage from './SingleMessage.vue';
export default {
  name: 'chat',
  data() {
    return {
      messages: [],
      typing: ""
    }
  },
  components: {
    SingleMessage
  },
  sockets: {
    connect() {
      console.log('socket connected')
    },
    ReciveMessage(messageData) {
      console.log(messageData);
      this.messages.push({
        msg: messageData.msg,
        userName: messageData.username
      });
      this.typing = "";
    },
    TypingMessage(data){
      this.typing = '<p><em>' + data.username + ' is typing a message...</em></p>'
        
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