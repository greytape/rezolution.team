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
          <th>Provide Update</th>
        </tr>
        <tr v-for="rezolution in myRezolutions">
          <td>{{ rezolution.name }}</td>
          <td>{{ rezolution.description }}</td>
          <td>{{ rezolution.updateFrequency }}</td>
          <td>Team</td>
          <td><router-link><i class="material-icons">create</i></router-link></td>
        </tr>
      </table>
      <router-link :to="'/myAccount/' + myInfo.id + '/CreateNewRezolution'"><button class="btn waves-effect waves-light light-green darken-4">Create New Rezolution</button></router-link>
    </div>
    <div class="col s12 card my-info">
      <h6>My teams</h6>
      <table>
        <tr>
          <td>Name</th>
          <td>Description</td>
        </tr>
        <tr v-for="team in myTeams">
          <td>{{ team.name }} </td>
          <td>{{ team.description }} </td>
        </tr>
      </table>
      <router-link :to="'/myAccount/' + myInfo.id + '/CreateNewTeam'"><button class="btn waves-effect waves-light light-green darken-4">Create New Team</button></router-link>
    </div>
  </div>
  
</template>


<script>
  import { db } from '@/firebase/init'

  export default {
    data: function() {
      return {
        myInfo: {
          
        },
        myTeams: [],
        myRezolutions: [],
      };
    },
    beforeCreate: function() {
      let userId = this.$route.params.userId;
      db.collection('users').doc(userId).get().then(doc => {
        this.myInfo = doc.data();
      });
    },
    beforeMount: [
      function() {
        let userId = this.$route.params.userId;
        let myTeams = db.collection('teams').where('users', 'array-contains', userId);
        let myTeamsLocal = [];
        myTeams.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            myTeamsLocal.push(doc.data());
          });
        });
        this.myTeams = myTeamsLocal;
      },
      function() {
        let userId = this.$route.params.userId;
        db.collection('rezolutions').doc(userId).get().then(querySnapshot => {
          this.myRezolutions = querySnapshot.data();
        });
      },
    ],
  } 
  
</script>


<style>
  .my-info {
    padding: 20px 60px;
    margin: 10% auto;
    width: 70%;
  }
</style>