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
      <h6>My rezolutions</h6>
      <table>
        <tr>
          <th>Name</th>
          <th>Associated Team</th>
          <th>Description</th>
          <th>Update Frequency</th>
          <th>Latest Update</th>
          <th>Date of latest Update</th>
          <th>Status</th>
          <th>Provide Update</th>
          <th>See All Updates</th>
        </tr>
        <tr v-for="rezolution in myRezolutions">
          <td>{{ rezolution.name }}</td>
          <td>{{ rezolution.teamName }}
          <td>{{ rezolution.description }}</td>
          <td>{{ rezolution.updateFrequency }}</td>
          <div v-if="rezolution.latestUpdate">
            <td>{{ rezolution.latestUpdate.commentary }}</td>
            <td>{{ rezolution.latestUpdate.date }}</td>
            <td>{{ rezolution.latestUpdate.status }}</td>
          </div>
          <div v-else>
            <td>No updates yet</td>
            <td> </td>
            <td> </td>
          </div>
          <td><router-link :to="createUpdatePath(rezolution.id)"><i class="material-icons">create</i></router-link></td>
        </tr>
      </table>
      <router-link :to="createNewRezolutionPath"><button class="btn waves-effect waves-light light-green darken-4">Create New Rezolution</button></router-link>
    </div>
    <div class="col s12 card my-info">
      <h6>My teams</h6>
      <table>
        <tr>
          <td>Name</th>
          <td>Description</td>
          <td>Team page</td>
        </tr>
        <tr v-for="team in myTeams">
          <td>{{ team.name }} </td>
          <td>{{ team.description }} </td>
          <td><router-link :to="'/teams/' + team.id"><i class="material-icons">arrow_forward</i></router-link></td>
        </tr>
      </table>
      <router-link :to="createNewTeamPath"><button class="btn waves-effect waves-light light-green darken-4">Create New Team</button></router-link>
    </div>
  </div>
  
</template>


<script>
  import { db } from '@/firebase/init'

  export default {
    data: function() {
      return {
        userId: this.$route.params.userId,
        myInfo: {},
        myTeams: [],
        myRezolutions: [],
      };
    },
    computed: {
      createNewRezolutionPath: function() {
        return '/myAccount/' + this.myInfo.id + '/CreateNewRezolution';
      },
      createNewTeamPath: function() {
        return '/myAccount/' + this.myInfo.id + '/CreateNewTeam';
      },
    },
    methods: {
      createUpdatePath(rezolutionId) {
        return '/myAccount/' + this.myInfo.id + '/' + rezolutionId + '/createUpdate';
      },
      fetchUserData() {
        db.collection('users').doc(this.userId).get().then(doc => {
          this.myInfo = doc.data();
        });
      },
      fetchTeamData() {
        let myTeams = db.collection('teams').where('users', 'array-contains', this.userId);
        let myTeamsLocal = [];
        myTeams.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            myTeamsLocal.push(doc.data());
          });
        });
        this.myTeams = myTeamsLocal;
      },
      fetchRezolutionData() {
        db.collection('rezolutions').doc(this.userId).get()
        .then(querySnapshot => {
          this.myRezolutions = querySnapshot.data();
        })
        .then( _ => {
          for (let rezolution in this.myRezolutions) {
            db.collection('updates').doc(rezolution).get().then(
            (documentSnapshot) => {
              if (documentSnapshot.data()) {
                let updates = documentSnapshot.data().updatesArray;
                this.$set(this.myRezolutions[rezolution], 'latestUpdate', updates[updates.length - 1]);
              }
            });
          }
        });
      },
      getLatestUpdate: function(rezolutionId) {
        return this.myRezolutions[rezolutionId].latestUpdate;
      },
    },
    created: function() {
      this.fetchUserData();
      this.fetchTeamData();
      this.fetchRezolutionData();
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