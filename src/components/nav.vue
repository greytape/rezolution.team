<template>
  <div>
    <nav class="light-green darken-4">
      <div class="nav-wrapper container">
        <a href="#" data-target="slide-out" class="sidenav-trigger hide-on-large-only"><i class="material-icons">menu</i></a>
        <router-link to="/" class="brand-logo permanent">rezolution.team</router-link>
        <ul id="nav-mobile" class="hide-on-med-and-down right">
          <li v-if="!isAuthenticated"><a href="#" class="modal-trigger" data-target="modal-register">Register</a></li>
          <li v-if="!isAuthenticated"><a href="#" class="modal-trigger" data-target="modal-login">Login</a></li>
          <li v-if="isAuthenticated"><router-link to="#">My Teams</router-link></li>
          <li v-if="isAuthenticated"><router-link :to="'/myAccount/' + user.uid">My Account</router-link></li>
          <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
      <div id="modal-register" class="modal">
        <div class="modal-content">
          <h4 class="grey-text text-darken-2">Register</h4><br />
          <form @submit.prevent="submitRegistration" id="register-form">
            <div class="input-field">
              <input v-model="newUser.firstName" type="text" id="register-first-name" required />
              <label for="register-first-name">First name</label>
            </div>
            <div class="input-field">
              <input v-model="newUser.lastName" type="text" id="register-last-name" required />
              <label for="register-last-name">Last name</label>
            </div>
            <div class="input-field">
              <input v-model="newUser.email" type="email" id="register-email" autocomplete="email" required />
              <label for="register-email">Email address</label>
            </div>
            <div class="input-field">
              <input v-model="newUser.password" autocomplete="new-password" type="password" id="register-password" required />
              <label for="register-password">Choose password</label>
            </div>
            <button class="btn yellow darken-2 z-depth-0">Submit</button>
          </form>
        </div>
      </div>
      <div id="modal-login" class="modal">
        <div class="modal-content">
          <h4>Login</h4><br />
          <form @submit.prevent="login" id="login-form">
            <div class="input-field">
              <input v-model="existingUser.email" type="email" autocomplete="email" id="login-email" required />
              <label for="login-email">Email address</label>
            </div>
            <div class="input-field">
              <input v-model="existingUser.password" autocomplete="current-password" type="password" id="login-password" required />
              <label for="login-password">Your password</label>
            </div>
            <button class="btn yellow darken-2 z-depth-0">Login</button>
          </form>
        </div>
      </div>  
    </nav>
    <ul id="slide-out" class="sidenav">
      <ul v-if="!isAuthenticated" id="nav-mobile" class="hide-on-large-only">
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="#">Login</router-link></li>
      </ul>
      <ul v-if="isAuthenticated" id="nav-mobile" class="hide-on-large-only">
        <li><router-link to="#">My Teams</router-link></li>
        <li><router-link :to="'/myAccount/' + user.uid">My Account</router-link></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </ul>

    </div>
</template>

<script>

import { auth, db } from '@/firebase/init'

export default {
  data: function() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      existingUser: {
        email: '',
        password: '',
      }
    };
  },
  props: {
    user: Object,
    isAuthenticated: Boolean,
  },
  methods: {
    submitRegistration: function() {
      let newUser = this.newUser;
      auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(cred => {
        db.collection('rezolutions').doc(cred.user.uid).set({
          exists: true,
        });
      })
      .then( _ => {
        return db.collection('users').doc(cred.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          id: cred.user.uid,
        });
      })
      .then( _ => {
        const modal = document.querySelector('#modal-register');
        const registerForm = document.querySelector('#register-form');
        M.Modal.getInstance(modal).close();
        registerForm.reset();
      }).catch(err => {
        console.log(err.code);
      });
    },
    login: function() {
      auth.signInWithEmailAndPassword(this.existingUser.email, this.existingUser.password)
      .then( _ => {
        const modal = document.querySelector('#modal-login');
        const registerForm = document.querySelector('#login-form');
        M.Modal.getInstance(modal).close();
        registerForm.reset();
      }).catch(err => {
        console.log(err.code);
      });
    },
    logout: function() {
      auth.signOut().then( () => {
        this.$router.push('/');
      });
    },
  },
  mounted: function() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});

      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
    });
  },
}
</script>


<style>

</style>
