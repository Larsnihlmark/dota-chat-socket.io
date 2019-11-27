<template>
  <div class="ChatInputBox">
    <input v-model="chatInputData" class="ChatInput" type="text" v-on:keyup.enter="handleEnter" placeholder="Message"/>
    <font-awesome-icon class="emote" :icon="['fas', 'grin-beam']"/>
    
  </div>
</template>

<script>

import store from '../Store/store';
export default {
  name: "ChatInput",
  data(){
    return{
      chatInputData: ""
    }
  },
  methods: {
    handleEnter(){
      store.commit('SaveMessage', this.chatInputData);
      this.$socket.client.emit('chat-message', { msg: this.chatInputData});
      this.chatInputData = '';
    }
  }
}
</script>

<style scoped>
.ChatInput{
  background-color: #484b52;
  color: #fbfbfb;
  border: 3px solid #4e5155;
  padding: 1em;
  width: 90%;
  
  
}
.ChatInputBox{
  border-top: 1px solid #4e5155;
  margin-bottom: 1em;
}
.emote{
  size: 2em;
  
}
</style>