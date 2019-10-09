<template>
  <div>
    <div class="banner-image" id="image-1"></div>
    <div class="container">
      <h2 class="raleway light-green-text text-darken-4 center-align">Get more done together</h2>
      <div class="row intro-cards">
        <div class="col s12 m4">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">group</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Work with friends</p>
            </div>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">timeline</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Track progress</p>
            </div>
          </div>
        </div>
        <div class="col s12 m4">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">done_outline</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Achieve your goals</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <h4 class="raleway light-green-text text-darken-4">Apply behavioural insights to help you achieve your goals</h4>
          <p class="flow-text">Everyone has goals that they never quite get round to. At <span class="raleway light-green-text text-darken-4">rezolution.team</span>, we apply the power of behavioural science to ensure that you finally get these things done.</p>
        </div>
        <div class="col s12 m6">
          <h3 class="raleway light-green-text text-darken-4">68% of smokers want to quit, but only 26% attempt to do so in any year.</h3>
        </div>
      </div>
      <div class="row outro-cards">
        <div class="col s6 m3">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">list_alt</i></div>
            <div class="card-content center-align">
              <p class="flow-text raleway light-green-text text-darken-4">Make commitments</p>
            </div>
          </div>
        </div>
        <div class="col s6 m3">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">share</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Invite your friends</p>
            </div>
          </div>
        </div>
        <div class="col s6 m3">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">update</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Post regular updates</p>
            </div>
          </div>
        </div>
        <div class="col s6 m3">
          <div class="card-panel z-depth-3">
            <div class="center-align"><i class="large material-icons">forum</i></div>
            <div class="card-content">
              <p class="flow-text raleway light-green-text text-darken-4">Discuss your progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center-align centred-button">
      <a class="btn-large orange darken-4" @click.prevent="showRegistrationModal">REGISTER NOW</a>
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
      showRegistrationModal: function() {
        this.$emit('showRegistrationModal');
      },
    },
  }
</script>


<style scoped>
  .banner-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-bottom: 25px; 
    
    background-size: cover;
    background-position: center;
  }

  #image-1 {
    background-image: url('../assets/action-adventure-challenge-461593.jpg');
  }

  #image-2 {
    background-image: url('../assets/backlit-clouds-friends-853168.jpg');
  }

  .intro-cards .card-panel {
    height: 260px;
  }

  .outro-cards .card-panel {
    height: 300px;
  }

  div.card-content {
    padding: 0 12px 12px 12px;
  }

  h4.center-align {
    margin: 0;
  }

  div.centred-button {
    margin-bottom: 20px;
  }
</style>