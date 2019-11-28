<template>

  <b-modal ref="my-modal" centered hide-footer title="Using Component Methods">
      <div class="d-block text-center">
        <h3>Hello From My Modal!</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
  </b-modal>


</template>

<script>
export default {
  name: "LoginModal",

  methods:{
    showModal(){
      this.$refs['my-modal'].show()
    },
    hideModal() {
      console.log("hello")
      this.$refs['my-modal'].hide()
      },
 }, 
   mounted() {
    console.log("hej");
    this.showModal();
  
  },
}
</script>

<style scoped>

</style>