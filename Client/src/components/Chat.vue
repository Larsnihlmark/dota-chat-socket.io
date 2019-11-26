<template>
  <div class="chatBox">
    <SingleMessage/>
  </div>
</template>

<script>
import SingleMessage from './SingleMessage.vue';
export default {
  name: 'chat',
  components: {
    SingleMessage
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