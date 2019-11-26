<template>
  <div class="Main">
    <div class="Title">
      <h2>Middle Chat</h2>
    </div>
    <Chat/>
    <ChatInput/>

  </div>

</template>



<script>
import ChatInput from './ChatInput';
import Chat from './Chat';
export default {
  name:'Main',
  components: {
    ChatInput,
    Chat

  }
}
</script>

<style scoped>
.Main{
  background-color: #36393e;
  width: 60%;
  float:right;
  height: 100vh;
  color: #fbfbfb;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;

}
.Title{
  position: absolute;
  right: 45%;
  top: 0em;
}

</style>