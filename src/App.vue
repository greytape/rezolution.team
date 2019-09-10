<template>
  <div>
    <nav-bar :is-authenticated="isAuthenticated" :user="user"></nav-bar>
    <router-view :user="user"></router-view>
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
            this.$router.push('/myAccount/' + this.user.uid);
          } else {
            this.user = null;
            if (this.$router.history.current.path !== '/') {
              this.$router.push('/');
            }
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
