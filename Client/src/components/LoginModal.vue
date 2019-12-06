<template>
<!-- Loginmodel som öppnas av start av sidan -->
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
      this.$refs['my-modal'].show(); //visar modal
    },
    handleSubmit(){
      store.commit('SaveUser', this.name)
      return this.$refs['my-modal'].hide(); //Gömmer modalen när ett user ha skrivit in och har klickat på submit knappen
    },
  }, 
  mounted() {
    this.showModal(); //Den sätter så att vi startat modalen direkt när sidan har laddas in
  },
}
</script>

<style scoped>
#modelHeader{
  background-color: black;
}

</style>