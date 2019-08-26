<template>
  <div>
    <div class="banner-image" id="image-1"></div>
    <div class="container">
      <h5 class="permanent light-green-text text-darken-4">Challenge yourself to achieve</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, tempora perferendis quam iste vel quia magnam corrupti voluptatem tenetur beatae. Quo cupiditate animi labore, a amet itaque ea in nobis veniam ratione necessitatibus iusto temporibus. Expedita, illo itaque quae dolorem adipisci, deleniti praesentium in officiis eligendi ipsam saepe ipsa perspiciatis, vero et nostrum ratione blanditiis veniam enim iure quos dolorum? Aut blanditiis ducimus illum repellendus rem ea unde iusto, sunt animi eaque voluptas, numquam eum inventore nobis necessitatibus quam maiores et esse similique. Reprehenderit natus nemo mollitia deleniti dignissimos, dicta necessitatibus commodi consectetur! Eligendi quisquam facere, nihil ut labore adipisci!</p>
    </div>
    <div class="banner-image" id="image-2"></div>
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
  .banner-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    
    background-size: cover;
    background-position: center;
  }

  #image-1 {
    background-image: url('../assets/action-adventure-challenge-461593.jpg');
  }

  #image-2 {
    background-image: url('../assets/backlit-clouds-friends-853168.jpg');
  }
</style>