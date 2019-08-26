<template>
  <div class="container">
    <h5>My Account</h5>
    <div class="col s12 card my-info">
      <h6>My info</h6>
      <table>
        <tr>
          <th>Name</th>
          <td>{{ myInfo.firstName }} {{ myInfo.lastName }}</td>
        </tr>
        <tr>
          <th>email</th>
          <td>{{ myInfo.email }}</td>
        </tr>
      </table>
    </div>
    <div class="col s12 card my-info">
      <h6>My resolutions</h6>
      <table>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Update Frequency</th>
          <th>Team</th>
        </tr>
        <tr v-for="rezolution in myInfo.rezolutions">
          <td>{{ rezolution.name }}</td>
          <td>{{ rezolution.description }}</td>
          <td>{{ rezolution.updateFrequency }}</td>
        </tr>
      </table>
      <router-link :to="'/myAccount/' + myInfo.id + '/CreateNewRezolution'"><button class="btn waves-effect waves-light light-green darken-4">Create New Rezolution</button></router-link>
    </div>
    <div class="col s12 card my-info">
      <h6>My teams</h6>
      <table>
        <tr>
          <th>Name</th>
          <td>{{ myInfo.firstName }} {{ myInfo.lastName }}</td>
        </tr>
        <tr>
          <th>email</th>
          <td>{{ myInfo.email }}</td>
        </tr>
      </table>
    </div>
  </div>
  
</template>


<script>
  import db from '@/firebase/init'

  export default {
    data: function() {
      return {
        myInfo: {},
      };
    },
    beforeCreate: function() {
      let memberId = this.$route.params.memberId;
      db.collection('members').doc(memberId).get().then(doc => {
        this.myInfo = doc.data();
      });
    }, 
  } 
  
</script>


<style>
  .my-info {
    padding: 20px 60px;
    margin: 10% auto;
    width: 70%;
  }
</style>