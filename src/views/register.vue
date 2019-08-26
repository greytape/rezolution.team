<template>
  <div class="container">
    <form class="col s12 card registration-form">
      <h5 class="light-green-text text-darken-4">Register</h5>
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6 offset-6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" class="validate">
          <label for="password">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12" id="email-field">
          <i class="material-icons grey-text text-lighten-1 right">email</i>
          <input id="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light light-green darken-4" type="submit" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>


<script>
  export default {
    components: {

    },
    data: function() {
      return {

      };
    },
    methods: {

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