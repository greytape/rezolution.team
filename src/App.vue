<template>
  <div>
    <nav-bar :isLoggedIn="isLoggedIn"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Nav from '@/components/nav'

  export default {
    components: {
      'nav-bar': Nav, 
    },
    data: function() {
      return {
        isLoggedIn: false,
      }
    }
  }
</script>

<style>

.permanent {
  font-family: 'Permanent Marker', cursive;
}

</style>
