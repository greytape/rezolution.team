<template>
  <div>
    <nav class="light-green darken-4">
      <div class="nav-wrapper container">
        <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
        <router-link to="/" class="brand-logo raleway">rezolution.team</router-link>
        <ul class="hide-on-med-and-down right">
          <li v-if="!isAuthenticated"><a href="#" @click.prevent="showLoginModal()">Login</a></li>
          <li v-if="!isAuthenticated"><a href="#" class="orange darken-4 btn" @click.prevent="showRegistrationModal()">REGISTER HERE</a></li>
          <li v-if="isAuthenticated"><router-link :to="'/myAccount/' + user.uid">My Account</router-link></li>
          <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
    
    <ul id="slide-out" class="sidenav">
      <ul v-if="!isAuthenticated" class="hide-on-large-only">
        <li v-if="!isAuthenticated"><a href="#" class="modal-trigger" data-target="modal-register">Register</a></li>
        <li v-if="!isAuthenticated"><a href="#" class="modal-trigger" data-target="modal-login">Login</a></li>
        <li v-if="isAuthenticated"><router-link :to="'/myAccount/' + user.uid">My Account</router-link></li>
        <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
      <ul v-if="isAuthenticated" class="hide-on-large-only">
        <li><router-link :to="'/myAccount/' + user.uid">My Account</router-link></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </ul>

    </div>
</template>

<script>

import { auth, db } from '@/firebase/init'

export default {
  props: {
    user: Object,
    isAuthenticated: Boolean,
  },
  methods: {
    showLoginModal: function() {
      this.$emit('showLoginModal');
    },
    showRegistrationModal: function() {
      this.$emit('showRegistrationModal');
    },
    logout: function() {
      auth.signOut().then( () => {
        if (this.$router.history.current.path !== '/') {
          this.$router.push('/');
        }
      });
    },
  },
  mounted: function() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});
    });
  },
}
</script>


<style>

  div.helper-text {
    position: static;
    line-height: 24px;
    margin-bottom: 10px;
  }

  #login-button {
    margin-top: 10px;
  }

  div.error-panel {
    padding: 6px;
  }

</style>
