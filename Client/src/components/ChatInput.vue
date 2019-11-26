<template>
  <div class="ChatInputBox">
    <input class="ChatInput" type="text" placeholder="Message"/>
    <font-awesome-icon class="emote" :icon="['fas', 'grin-beam']"/>
    
  </div>
</template>

<script>
export default {
  
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