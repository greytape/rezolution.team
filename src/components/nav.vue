<template>
  <nav class="light-green darken-4">
    <div class="nav-wrapper container">
      <router-link to="/" class="brand-logo permanent">rezolution.team</router-link>
      <ul v-if="!isLoggedIn" id="nav-mobile" class="hide-on-med-and-down right">
        <li><router-link to="#">About</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="#">Login</router-link></li>
      </ul>
      <ul v-if="isLoggedIn" id="nav-mobile" class="hide-on-med-and-down right">
        <li><router-link to="#">About</router-link></li>
        <li><router-link to="#">My Teams</router-link></li>
        <li><router-link :to="'/myAccount/' + memberId">My Account</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    isLoggedIn: Boolean,
    memberId: String,
  },
}
</script>


<style>

</style>
