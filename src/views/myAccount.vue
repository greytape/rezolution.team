<template>
  <div class="container">
    <h5>My Account</h5>
    <div class="my-tables">
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
    <div class="my-tables">
      <h5>My Rezolutions</h5>
      <table>
        <tr>
          <th>Name</th>
          <th>Associated Team</th>
          <th>Description</th>
          <th>Update Frequency</th>
          <th>Latest Update</th>
          <th>Date of latest Update</th>
          <th>Status</th>
          <th>See All Updates</th>
          <th>Provide Update</th>
          <th>Edit Rezolution</th>
        </tr>
        <tr v-for="rezolution in myRezolutions" :key="rezolution.id" :class="rezolutionFormat(rezolution)">
          <td>{{ rezolution.name }}</td>
          <td>{{ rezolution.teamName }}
          <td>{{ rezolution.description }}</td>
          <td>{{ rezolution.updateFrequency }}</td>
          <template v-if="rezolution.latestUpdate">
            <td>{{ rezolution.latestUpdate.commentary }}</td>
            <td>{{ rezolution.latestUpdate.date }}</td>
            <td>{{ rezolution.latestUpdate.status }}</td>
            <td><router-link :to="'/' + rezolution.id + '/viewRezolution'"><i class="material-icons">list</i></router-link></td>
          </template>
          <template v-else>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </template>
          <td><router-link :to="createUpdatePath(rezolution.id)"><i class="material-icons">note_add</i></router-link></td>
          <td><router-link :to="createEditPath(rezolution.id)"><i class="material-icons">create</i></router-link></td>
        </tr>
      </table>
      <router-link :to="createNewRezolutionPath"><button class="btn waves-effect waves-light light-green darken-4">Create New Rezolution</button></router-link>
    </div>
    <div class="my-tables">
      <h5>My Teams</h5>
      <table>
        <tr>
          <th>Name</th>
          <th>Admin</th>
          <th>Description</th>
          <th>Team page</th>
        </tr>
        <tr v-for="team in myTeams" :key="team.id">
          <td>{{ team.name }} </td>
          <td>{{ team.adminName }}</td>
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
        myTeams: {},
        myRezolutions: {},
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
      createEditPath(rezolutionId) {
        return '/myAccount/' + this.myInfo.id + '/' + rezolutionId + '/editRezolution';
      },
      fetchUserData() {
        db.collection('users').doc(this.userId).get().then(doc => {
          this.myInfo = doc.data();
        });
      },
      fetchTeamData() {
        let myTeams = db.collection('teams').where('users', 'array-contains', this.userId);
        myTeams.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.myTeams[doc.data().id] = doc.data();
          }, this);
        }).then(_ => {
          this.getAdminNamesFromUserIds();
        });
      },
      fetchRezolutionData() {
        db.collection('rezolutions').where('userId', '==', this.userId).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let rezolution = doc.data();
            this.myRezolutions[rezolution.id] = rezolution;
          }, this);
        })
        .then( _ => {
          this.addLatestUpdates();
        });
      },
      getAdminNamesFromUserIds: function() {
        for (let team in this.myTeams) {
          db.collection('users').doc(this.myTeams[team].adminUserId).get().then(docSnapShot => {
            this.myTeams[team].adminName = docSnapShot.data().firstName + ' ' + docSnapShot.data().lastName;
          });  
        }
        this.$forceUpdate();
      },
      addLatestUpdates: function() {
        for (let rezolution in this.myRezolutions) {
          let rezolutionId = this.myRezolutions[rezolution].id;

          db.collection('updates').where('rezolutionId','==', rezolutionId).orderBy('timestamp').get().then(querySnapshot => {
              if (querySnapshot.docs.length > 0) {
                this.myRezolutions[rezolutionId].latestUpdate = querySnapshot.docs[querySnapshot.docs.length - 1].data();
              }
              this.$forceUpdate();
          });
        }
      },
      rezolutionFormat: function(rezolution) {
        if (!rezolution.latestUpdate) {
          return '';
        } else {
          if (rezolution.latestUpdate.status === 'red') {
            return 'red-text text-darken-3'
          }
          if (rezolution.latestUpdate.status === 'amber') {
            return 'amber-text text-darken-3'
          };
          if (rezolution.latestUpdate.status === 'green') {
            return 'green-text text-darken-3'
          };
        }
      },
    },
    created: function() {
      this.fetchUserData();
      this.fetchTeamData();
      this.fetchRezolutionData();
    },
  } 
  
</script>


<style scoped>
  .my-tables {
    padding: 20px 0;
    margin: 0 auto;
  }

  .my-info {
    padding: 20px 0;
    margin: 20px auto;
    width: 70%;
  }


</style>