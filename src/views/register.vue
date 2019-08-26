<template>
  <div class="container">
    <form class="col s12 card registration-form">
      <h5 class="light-green-text text-darken-4">Register</h5>
      <div class="row">
        <div class="input-field col s6">
          <input id="first-name" v-model="newUser.firstName" type="text" class="validate">
          <label for="first-name">First Name</label>
        </div>
        <div class="input-field col s6 offset-6">
          <input id="last-name" v-model="newUser.lastName" type="text" class="validate">
          <label for="last-name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" v-model="newUser.password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12" id="email-field">
          <i class="material-icons grey-text text-lighten-1 right">email</i>
          <input id="email" v-model="newUser.email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light light-green darken-4" @click.prevent="submitForm" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
  import db from '@/firebase/init'

  export default {
    components: {

    },
    data: function() {
      return {
        newUser: {
          firstName: '',
          lastName: '',
          password: '',
          email: '',
          rezolutions: [],
          teams: [],
        }
      };
    },
    methods: {
      submitForm: function() {
        db.collection('members').add(this.newUser).then(ref => {
          ref.update({ id: ref.id});
        });
        this.$router.push('/');
      },
    },
  }
</script>


<style scoped>
  #email-field {
    position: relative;
  }

  #email-field i {
    position: absolute;
    top: 25%;
    right: 5%;
  }

  .row {
    margin-bottom: 0;
  }

  .registration-form {
    padding: 20px 60px;
    margin: 10% auto;
    width: 70%;
  }
</style>