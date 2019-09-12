<template>
  <div class="container">
    <div class="col s12 card my-tables">
      <h4>{{ teamInfo.name }}</h4>
      <h6>{{ teamInfo.description }}</h6>
      <h6>
        <template v-if="userIsAdmin">You are the admin of this group.</template>
        <template v-else>You are not the admin of this group.</template>
      </h6>
      <table>
        <tr>
          <th>Rezolution</th>
          <th>Owner</th>
          <th>Update Frequency</th>
          <th>Latest Update</th>
          <th>Date of latest Update</th>
          <th>Status</th>
        </tr>
        <tr v-for="rezolution in teamRezolutions" :key="rezolution.id" :class="rezolutionFormat(rezolution)">
          <td>{{ rezolution.name }} </td>
          <td>{{ rezolution.userName }} </td>
          <td>{{ rezolution.updateFrequency }} </td>
          <template v-if="rezolution.latestUpdate">
            <td>{{ rezolution.latestUpdate.commentary }}</td>
            <td>{{ rezolution.latestUpdate.date }}</td>
            <td>{{ rezolution.latestUpdate.status }}</td>
          </template>
        </tr>
      </table>
    </div>
    <div v-if="userIsAdmin" class="col s12 card my-tables">
      <h5>Add new users to team</h5>
      <form action="#" @submit.prevent="addNewUser">
        <label for="newUser">New user's email</label>
        <input type="text" id="newUser">
        <button class="btn light-green darken-4">Submit<i class="material-icons right">send</i></button>
        <p class="red-text">{{ negativeFeedback }}</p>
        <p class="green-text">{{ positiveFeedback }}</p>
      </form>
    </div>
    <div class="col s12 card my-tables">
      <h5>Current team users</h5>
      <ul v-if="teamInfo.users" class="collection">
        <li v-for="(userEmail, index) in userEmails" class="collection-item" :key="index">{{ userEmail }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { db } from '@/firebase/init'
  import firebase from 'firebase/app'

  export default { 
    props: {
      user: Object,
    },
    data: function() {
      return {
        userEmails: [],
        teamRezolutions: {},
        teamId: this.$route.params.teamId,
        teamInfo: {},
        negativeFeedback: '',
        positiveFeedback: '',
      };
    },
    methods: {
      addNewUser: function() {
        if (!this.checkValidEmail(event.target['newUser'].value)) {
          this.negativefeedback = 'Please add the email address of the user that you would like to add.';
          this.positiveFeedback = '';
        } else {
          this.checkUserId(event.target['newUser'].value).then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              let newUserId = querySnapshot.docs[0].id;
              this.submitUserId(newUserId);
            } else {
              this.negativeFeedback = 'User not found in system.';
              this.positiveFeedback = '';
            }
          });
        }
        event.target.value = ''
      },
      getTeamRezolutions: function() {
        let promises = [];
        this.teamInfo.rezolutions.forEach(rezolution => {
          promises.push(db.collection('rezolutions').doc(rezolution).get());
        });
        Promise.all(promises).then(snapshotArray => {
          snapshotArray.forEach(snapshot => {
            this.teamRezolutions[snapshot.id] = snapshot.data();
          }, this);
          this.getLatestUpdates();
          this.$forceUpdate();
        });
      },
      getLatestUpdates: function() {
        let promises = [];
        for (let rezolution in this.teamRezolutions) {
          promises.push(db.collection('updates').where('rezolutionId','==', rezolution).orderBy('timestamp').get());
        }
        Promise.all(promises).then(promiseArray => {
          promiseArray.forEach(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              let latestUpdate = querySnapshot.docs[querySnapshot.docs.length - 1].data();
              this.teamRezolutions[latestUpdate.rezolutionId].latestUpdate = latestUpdate;
            }
          });
          this.$forceUpdate();
        });
      },
      getTeamInfo: function() {
        return db.collection('teams').doc(this.teamId);
      },
      checkUserId: function(email) {
        return db.collection('users').where('email', '==', email).get();
      },
      checkValidEmail: function(allegedEmail) {
        return /\S+@\S+\.\S+/.test(allegedEmail);
      },
      rezolutionFormat: function(rezolution) {
        if (!rezolution.latestUpdate) {
          return '';
        } else {
          return rezolution.latestUpdate.status;
        }
      },
      submitUserId: function(newUserId) {
        db.collection('teams').doc(this.teamId).update({
          users: firebase.firestore.FieldValue.arrayUnion(newUserId),
        }).then(_ => {
          this.positiveFeedback = 'User successfully submitted';
          this.negativeFeedback = '';
        }).catch(err => {
          console.log(err);
        });
      },
      getUserEmails: function() {
        let promises = [];
        let userEmails = [];
        for (let userId in this.teamInfo.users) {
          promises.push(db.collection('users').where('id', '==', this.teamInfo.users[userId]).get());
        }
        Promise.all(promises).then(querySnapshotArray => {
          querySnapshotArray.forEach(querySnapshot => {
            userEmails.push(querySnapshot.docs[0].get('email'));
          });
        });
        return userEmails;
      },
    },
    computed: {
      userIsAdmin: function() {
        if (this.user) {
          return this.user.uid === this.teamInfo.adminUserId;
        }
      },
    },
    watch: {
      teamInfo: function() {
        this.userEmails = this.getUserEmails();
      }
    },
    created: function() {
      this.getTeamInfo().onSnapshot(documentSnapshot => {
        this.teamInfo = documentSnapshot.data();
        this.getTeamRezolutions();
      });
    },
  }
</script>

<style>
  .my-tables {
    padding: 20px 60px;
    margin: 10% auto;
  }
</style>