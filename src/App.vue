<template>
  <div>
    <nav-bar :isLoggedIn="isLoggedIn" :memberId="memberId"></nav-bar>
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
        isLoggedIn: true,
        memberId: 'IYeKwWnGs0KNGwVqi23x',
      }
    }
  }
</script>

<style>

.permanent {
  font-family: 'Permanent Marker', cursive;
}

</style>
