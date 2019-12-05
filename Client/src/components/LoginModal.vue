<template>

  <b-modal ref="my-modal" body-bg-variant="dark"  bg-dark centered hide-footer hide-header title="Display Your Name">
      <div class="d-block text-center text-white bg-dark">
        <h3>Submit Your Username</h3>
      </div>
      <form ref="form">
        <b-form-group
          class="text-white"
          :state="nameState"
          label="Username"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
        <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
       <b-button size="sm" class="mt-1" variant="success" block @click="handleSubmit">Submit</b-button>
       <!-- <b-button size="sm" class="mt-1" variant="outline-danger"  @click="hideModal">Close Me</b-button> -->
  </b-modal>


</template>

<script>
import store from '../Store/store';
export default {
  name: "LoginModal",

  data(){
    return{
        name: "",
        nameState: null,
        
    }
  },
  methods:{
    showModal(){
      this.$refs['my-modal'].show()
    },
    handleSubmit() {
      store.commit('SaveUser', this.name)
      return this.$refs['my-modal'].hide()
      },
 }, 
   mounted() {
    
    this.showModal();
  
  },
}
</script>

<style scoped>
#modelHeader{
  background-color: black;
}

</style>