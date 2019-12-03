<template>

<b-modal id="rooms-modal" ref="rooms-modal" body-bg-variant="dark"  bg-dark centered hide-footer hide-header title="Display Your Name">
    <div class="d-block text-center text-white bg-dark">
        <h3>Custom Room</h3>
    </div>
    <form ref="rooms-form" >
        <b-form-group
        class="text-white"
        label="Room Name"
        label-for="name-input"
        invalid-feedback="Name is required"
        >
            <b-form-input
                id="name-input"
                v-model="name"
                required
            ></b-form-input>
        </b-form-group>
        <b-form-group
        class="text-white"
        label="Password (optional)"
        label-for="password-input"
        invalid-feedback="Password is invalid"
        >
            <b-form-input
                id="password-input"
                v-model="password"
            ></b-form-input>
        </b-form-group>
    </form>
    <b-button size="sm" class="mt-1" variant="success" block  @click="handleSubmit">Enter Custom Room</b-button>
    <p class="error">{{this.error}}</p>
</b-modal>


</template>

<script>
import store from '../Store/store';
export default {
    name: "LoginModal",

    data(){
        return{
            name: "",
            password: "",
            error: ""
            
        }
    },
    methods:{
        showModal(){
            // this.$refs['rooms-modal'].show()
        },
        handleSubmit() {
            // join room 
            this.$socket.client.emit('join-room', { room: this.name, username: store.state.userName, password: this.password }, (status) => {
                if(status === false) {
                    // display error
                    this.error = "Wrong password for " + this.name;
                } else {
                    // update room
                    store.commit('SaveRooms', this.name);
                    // reset messages
                    store.commit('resetMessages');
                    // hide modal
                    return this.$refs['rooms-modal'].hide();
                }
            });
        },
    }
}
</script>

<style scoped>
#modelHeader{
    background-color: black;
}
.error {
    color: red;
    font-weight: red;
}

</style>