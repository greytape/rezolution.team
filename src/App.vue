<template>
  <div>
    <nav-bar :is-authenticated="isAuthenticated" :user="user"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from '@/components/nav'
  import { auth } from '@/firebase/init'

  export default {
    components: {
      'nav-bar': Nav, 
    },
    data: function() {
      return {
        user: null,
      };
    }, 
    computed: {
      isAuthenticated: function() {
        auth.onAuthStateChanged(user => {
          if (user) {
            this.user = user;
          } else {
            this.user = null;
          }
        }).bind(this);

        return (this.user !== null);
      },
    }
  }
</script>

<style>

.permanent {
  font-family: 'Permanent Marker', cursive;
}

</style>
