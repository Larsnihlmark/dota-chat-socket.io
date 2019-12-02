<template>
  <div class="singleMessage">
    <span class="username">{{this.userName}}</span>
    <div v-if="this.singleMessage.indexOf('https://api.opendota.com/apps/dota2/images/') !== -1">
      <img v-bind:src='this.singleMessage'><img>  
    </div>
      <div v-else>
        <p>{{this.singleMessage}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'SingleMessages',
  props: {
    singleMessage: String,
    userName: String
  }
}
</script>

<style scoped>
.singleMessage{
      border-top: 1px solid gray;
      border-bottom: 1px solid gray;
      width: auto;
      margin-bottom: 1em;
      text-align: left;
      padding: 1.5em;
}
.username {
  font-weight: bold;
  color: #2dcb70;
}

</style>