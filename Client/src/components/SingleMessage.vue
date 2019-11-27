<template>
  <div class="singleMessage">
    <p>{{this.singleMessage}}</p>
  </div>
</template>

<script>
export default {
  name: 'SingleMessages',
  props: {
    singleMessage: String
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
</style>