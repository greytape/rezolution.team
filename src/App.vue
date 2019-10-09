<template>
  <div>
    <nav-bar :is-authenticated="isAuthenticated" :user="user"@showLoginModal="showLoginModal()" @showRegistrationModal="showRegistrationModal()"></nav-bar>
    <router-view :user="user" @showLoginModal="showLoginModal()" @showRegistrationModal="showRegistrationModal()"></router-view>
    <div id="modal-login" class="modal">
      <div class="modal-content">
        <h4 class="grey-text text-darken-2">Login</h4><br />
        <form @submit.prevent="login" id="login-form">
          <div class="input-field">
            <input v-model="existingUser.email" type="email" autocomplete="email" id="login-email" required class="validate"/>
            <label for="login-email">Email address</label>
            <div class="helper-text" :data-error="emailError"></div>
          </div>
          <div class="input-field">
            <input v-model="existingUser.password" autocomplete="current-password" type="password" id="login-password" class="validate" minlength="6" required/>
            <label for="login-password">Your password</label>
            <div class="helper-text" :data-error="passwordError"></div>
          </div>
          <div class="error-panel card-panel red lighten-1" v-if="serverLoginError">That email password not/recognised, please try again</div>
          <button id="login-button" class="btn yellow darken-2 z-depth-0">Login</button>
        </form>
      </div>
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
  </div>
</template>

<script>
  import Nav from '@/components/nav'
  import { auth, db } from '@/firebase/init'

  export default {
    components: {
      'nav-bar': Nav,
    },
    data: function() {
      return {
        user: null,
        newUser: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        existingUser: {
          email: '',
          password: '',
        },
        passwordError: 'Your password must contain at least 6 characters.',
        emailError: 'Please enter a valid email address',
        serverLoginError: false,
      };
    },
    methods: {
      showLoginModal: function() {
        let element = document.querySelector('#modal-login');
        let instance = M.Modal.getInstance(element);
        instance.open();
      },
      closeLoginModal: function() {
        let element = document.querySelector('#modal-login');
        let instance = M.Modal.getInstance(element);
        instance.close();
      },
      showRegistrationModal: function() {
        let element = document.querySelector('#modal-register');
        let instance = M.Modal.getInstance(element);
        instance.open();
      },
      login: function() {
        auth.signInWithEmailAndPassword(this.existingUser.email, this.existingUser.password)
        .then( _ => {
          const modal = document.querySelector('#modal-login');
          const registerForm = document.querySelector('#login-form');
          M.Modal.getInstance(modal).close();
          registerForm.reset();
          this.$router.push('/myAccount/' + this.user.uid);
        }).catch(err => {
          if (err.code === 'auth/user-not-found') {
            this.serverLoginError = true;
          }
        });
      },
      submitRegistration: function() {
        let newUser = this.newUser;
        auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then( cred => {
          db.collection('users').doc(cred.user.uid).set({
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
    },
    computed: {
      isAuthenticated: function() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.user = user;
            if (this.$router.history.current.path === '/') {
              this.$router.push(`/myAccount/${this.user.uid}`);
            }
          } else {
            this.user = null;
            if (this.$router.history.current.path !== '/') {
              this.$router.push('/');
            }
          }
        }).bind(this);

        return (this.user !== null);
      },
    },
    mounted: function() {
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
      });
    },
  }
</script>

<style>

.permanent {
  font-family: 'Permanent Marker', cursive;
}

.raleway{
  font-family: 'Raleway', sans-serif;
}

</style>
