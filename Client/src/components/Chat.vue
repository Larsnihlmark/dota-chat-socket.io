<template>
  <div class="chatBox"> 
    <div v-for="message in messages" v-bind:key="message.msg">
      <SingleMessage v-bind:singleMessage="message" />
    </div>
  </div>
</template>

<script>

import SingleMessage from './SingleMessage.vue';
export default {
  name: 'chat',
  data() {
    return {
      messages: []
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
      this.messages.push(messageData.msg);
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