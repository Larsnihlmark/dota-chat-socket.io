<template>
  <div class="ChatInputBox">
    <b-dropdown ref="dropUp" id="dropdown-dropup" no-caret dropup text="" variant="link">
      <b-dropdown-item @click="handleTimeZoneClick" class="dropUpItem" href="#">/CurrentTime</b-dropdown-item>
      <b-dropdown-item @click="handleHeroIcon" class="dropUpItem" href="#">/HeroIcon</b-dropdown-item>
      <b-dropdown-item  @click="handleHeroImage" class="dropUpItem" href="#">/HeroImage</b-dropdown-item>
    </b-dropdown>
    <input v-model="chatInputData" class="ChatInput" type="text" v-on:input="broadcastMessage" v-on:keyup.enter="handleEnter" v-on:keyup.55="toggleDropUp" placeholder="Message"/>
      <b-dropdown  toggle-class="text-decoration-none" dropup no-caret>
        <template v-slot:button-content>
          <font-awesome-icon class="emote" :icon="['fas', 'grin-beam']"/>
        </template>
        <b-dropdown-item href="#"></b-dropdown-item>
      </b-dropdown>
  </div>
</template>

<script>

import store from '../Store/store';
import axios from 'axios';

export default {
  name: "ChatInput",
  data(){
    return{
      chatInputData: ''
    }
  },
  methods: {
    handleEnter(){
      if (this.chatInputData.indexOf('/TimeZone ') !== -1) {
        const timezoneData = this.chatInputData.split(' ');
        const continent = timezoneData[1];
        const city = timezoneData[2];
        // send API request
        axios.get('http://localhost:8080/api/timezone/' + continent + '/' + city)
          .then((response) => {
            let timeZoneMessage = 'Current time in ' + city + ' is ' + response.data;  
            this.$socket.client.emit('chat-message', { msg: timeZoneMessage, username: store.state.userName, room: store.state.selectedRoom });
            this.chatInputData = '';
          })
          .catch((error) => {
            console.log(error);
          }); 
      }
      else if(this.chatInputData.indexOf('/HeroIcon') !== -1){
        const heroIconData = this.chatInputData.split(' ');
        let name = heroIconData[1];
        if (heroIconData[2] !== undefined) {
          name = name + '%20' + heroIconData[2];
        }
        axios.get('http://localhost:8080/api/icon/' + name + '/')
        .then((response) => {
          let IconMessage = response.data;  
            this.$socket.client.emit('chat-message', { msg: IconMessage, username: store.state.userName, room: store.state.selectedRoom });
            this.chatInputData = '';
        })
        .catch((error) => {
          console.log(error)
          this.chatInputData = '';
        })
      }
      else if(this.chatInputData.indexOf('/HeroImage') !== -1){
        const heroImageData = this.chatInputData.split(' ');
        let name = heroImageData[1];
        name = name.replace(' ', '%20');
        //send API request
        axios.get('http://localhost:8080/api/image/' + name + '/')
        .then((response) => {
          let IconMessage = response.data;  
          this.$socket.client.emit('chat-message', { msg: IconMessage, username: store.state.userName, room: store.state.selectedRoom });
          this.chatInputData = '';
        })
        .catch((error) => {
          console.log(error)
          this.chatInputData = '';
        })
      }
       else {
        this.$socket.client.emit('chat-message', { msg: this.chatInputData, username: store.state.userName, room: store.state.selectedRoom });
        this.chatInputData = '';
      }
    },
    toggleDropUp(){
      if(this.chatInputData === "/"){
        this.$refs.dropUp.visible = !this.$refs.dropUp.visible;
        
      }
    },
    broadcastMessage(){
      this.$socket.client.emit('Typing', {username: store.state.userName, room: store.state.selectedRoom});
    },
    handleTimeZoneClick() {
      this.chatInputData = '/TimeZone continent city';
    },
    handleHeroIcon(){
      this.chatInputData = "/HeroIcon HeroName";
    },
    handleHeroImage(){
      this.chatInputData = "/HeroImage HeroName";
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
  width: 85%;
  
  
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