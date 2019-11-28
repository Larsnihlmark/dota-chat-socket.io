<template>
  <div class="ChatInputBox">
    <b-dropdown ref="dropUp" id="dropdown-dropup" no-caret dropup text="" variant="link">
      <b-dropdown-item @click="handleTimeZoneClick" class="dropUpItem" href="#">/CurrentTime</b-dropdown-item>
      <b-dropdown-item class="dropUpItem" href="#">Another action</b-dropdown-item>
      <b-dropdown-item  class="dropUpItem" href="#">Something else here</b-dropdown-item>
    </b-dropdown>
    <input v-model="chatInputData" class="ChatInput" type="text" v-on:keyup.enter="handleEnter" v-on:keyup.55="toggleDropUp" placeholder="Message"/>
    <font-awesome-icon class="emote" :icon="['fas', 'grin-beam']"/>
    
  </div>
</template>

<script>

import store from '../Store/store';
import axios from 'axios';

export default {
  name: "ChatInput",
  data(){
    return{
      chatInputData: ""
    }
  },
  methods: {
    handleEnter(){
      if (this.chatInputData.indexOf('/Timezone ')) {
        const timezoneData = this.chatInputData.split(' ');
        const continent = timezoneData[1];
        const city = timezoneData[2];
        // send API request
        axios.get('http://localhost:8080/api/timezone/' + continent + '/' + city)
          .then((response) => {
            let timeZoneMessage = 'Current time in ' + city + ' is ' + response.data;  
            this.$socket.client.emit('chat-message', { msg: timeZoneMessage });
            this.chatInputData = '';
          })
          .catch((error) => {
            console.log(error);
            this.chatInputData = '';
          }); 
      } else {
        store.commit('SaveMessage', this.chatInputData);
        this.$socket.client.emit('chat-message', { msg: this.chatInputData});
        this.chatInputData = '';
      }
    },
    toggleDropUp(){
      if(this.chatInputData === "/"){
        this.$refs.dropUp.visible = !this.$refs.dropUp.visible;
        
      }
    },
    handleTimeZoneClick() {
      this.chatInputData = "/TimeZone continent city";
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
#dropdown-dropup{
  margin-bottom: 5em; 
  left: 1.5em;
  
}

</style>