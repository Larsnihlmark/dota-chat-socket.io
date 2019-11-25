<template>
  <div class="Main">
    <div>
      <h2>Middle Chat</h2>
    </div>
    <ChatInput/>
  </div>

</template>



<script>
import ChatInput from './ChatInput';
export default {
  name:'Main',
  components: {
    ChatInput

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
  justify-content: space-between;
  flex-direction: column;

}
</style>