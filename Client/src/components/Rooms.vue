
<template>
  <div class="Room">
  <div class="RoomHeader">
    <h2>DotaChat

    <font-awesome-icon class="userPlus" :icon="['fas', 'user-plus']"/>
    </h2>

  </div>
    <div> 
      <span>
        <p>
            <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Admin</p>
      </span>
    </div>
    <div>
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #General</p>
      </span>
    </div>
    <div>
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #ShietTalk</p>
      </span>
    </div>
    <div>
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Programming</p>
      </span>
    </div>
    <div>
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Dota</p>
      </span>
    </div>
    <div>
      <span>
        <p>
          <font-awesome-icon :icon="['fas', 'volume-up']"/>
          #Life</p>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Rooms from './Rooms'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVolumeUp, faUserPlus, faGrinBeam} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faVolumeUp, faUserPlus, faGrinBeam)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
export default {
  el: '.Room',
  component: {Rooms},
  name: Rooms
}
</script>

<style scoped>
.Room{
  width: 20%;
  background-color: #303136;
  float: left;
  height: 100vh;
  color: #fbfbfb;
}
.RoomHeader{
  /* padding: 1%; */
  border: 1px solid gray;
  background-color: #36393e;
}
.userPlus{
  float: right;
  width: 20%;
  height: 18px;
}
.RoomHeader > div{
  padding: 2em;
  margin: 1em;
}
</style>