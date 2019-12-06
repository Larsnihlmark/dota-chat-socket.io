<template>
<!-- Chatinput boxen -->
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
   /*  Hantering av enterpress  */
    handleEnter(){
      store.commit('updateError', "");
      if (this.chatInputData.indexOf('/TimeZone ') !== -1) {
        const timezoneData = this.chatInputData.split(' ');//Vi vill splita för Orden föra att bara hämta ut världsdel och stad
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
            store.commit('updateError'," Name misspelling try other Continet or Capital city");
          }); 
      }
      else if(this.chatInputData.indexOf('/HeroIcon') !== -1){ //Enterpress för HeroIcon
        const heroIconData = this.chatInputData.split(' ');
        let name = heroIconData[1];
        if (heroIconData[2] !== undefined) {
          name = name + '%20' + heroIconData[2];
        }
        axios.get('http://localhost:8080/api/icon/' + name + '/')
        .then((response) => {
          let iconMessage = response.data;  
            this.$socket.client.emit('chat-message', { msg: iconMessage, username: store.state.userName, room: store.state.selectedRoom });
            this.chatInputData = '';
        })
        .catch((error) => {
          console.log(error)
          store.commit('updateError', "Icon name misspelling try other name or hero for example Lina" );
          this.chatInputData = '';
        })
      }
      else if(this.chatInputData.indexOf('/HeroImage') !== -1){ //Enterpress för HeroImage
        const heroImageData = this.chatInputData.split(' ');
        let name = heroImageData[1];
        name = name.replace(' ', '%20'); //byt space mot html tecken för API ska fungera med heroname med mellanrum
        //send API request
        axios.get('http://localhost:8080/api/image/' + name + '/')
        .then((response) => {
          let imageMessage = response.data;  
          this.$socket.client.emit('chat-message', { msg: imageMessage, username: store.state.userName, room: store.state.selectedRoom });
          this.chatInputData = '';
        })
        .catch((error) => {
          console.log(error)
          store.commit('updateError',"Image name misspelling try other name or hero for example Lina");
          this.chatInputData = "";
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
      //När någon skriver i inputfältet skickar till server att någon skriver
      this.$socket.client.emit('Typing', {username: store.state.userName, room: store.state.selectedRoom});
    },
    handleTimeZoneClick() {
      this.chatInputData = '/TimeZone continent city';//Skriv in detta i chatboxen när man klickar på "/" Timezone på dropup
    },
    handleHeroIcon(){
      this.chatInputData = "/HeroIcon HeroName"; //Skriv in detta i chatboxen när man klickar på "/" HeroIcon på dropup
    },
    handleHeroImage(){
      this.chatInputData = "/HeroImage HeroName";//Skriv in detta i chatboxen när man klickar på "/" HeroImage på dropup
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