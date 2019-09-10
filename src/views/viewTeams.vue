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
        <tr v-for="rezolution in teamRezolutions">
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
    <div class="col s12 card my-tables">
      <h5>Add new users to group</h5>
      <form action="#">
        <label for="newUser">New user's email</label>
        <input id="newUser" @keydown.tab.prevent="addNewUser"><button class="btn-floating light-green darken-4" @click.prevent="addNewUser"><i class="material-icons">add</i></button>
        <button class="btn light-green darken-4" @click.prevent="submitNewUsers">Submit<i class="material-icons right">send</i></button>
        <p class="red-text">{{ negativeFeedback }}</p>
        <p class="green-text">{{ positiveFeedback }}</p>
      </form>
      <ul class="collection">
        <li class="collection-item" v-for="newUser in newUserEmails">
          {{ newUser }}
        </li>
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
        teamRezolutions: {},
        teamId: this.$route.params.teamId,
        teamInfo: {},
        newUserEmails: [],
        newUserIds: [],
        negativeFeedback: '',
        positiveFeedback: '',
      };
    },
    methods: {
      addNewUser: function() {
        if (/\S+@\S+\.\S+/.test(event.target.value)) {
          this.retrieveAndStoreUserId(event.target.value);
          this.negativeFeedback = '';
          this.positiveFeedback = '';
          event.target.value = ''
        } else {
          this.feedback = 'Please add the email address of the user that you would like to add.';
          this.positiveFeedback = '';
          event.target.value = '';
        }
      },
      getTeamRezolutions: function() {
        this.teamInfo.rezolutions.forEach(rezolution => {
          db.collection('rezolutions').doc(rezolution).get().then(documentSnapshot => {
              this.teamRezolutions[rezolution] = documentSnapshot.data();
          })
          .then( _ => {
            return db.collection('updates').where('rezolutionId','==', rezolution).orderBy('timestamp').get();
          })
          .then(querySnapshot => {
            if (querySnapshot.docs.length > 0) {
              this.teamRezolutions[rezolution].latestUpdate = querySnapshot.docs[querySnapshot.docs.length - 1].data();
            }
            this.$forceUpdate();
          });
        }, this);
      },
      getTeamInfo: function() {
        return db.collection('teams').doc(this.teamId).get();
      },
      retrieveAndStoreUserId: function(email) {
        db.collection('users').where('email', '==', email).get().then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            this.newUserIds.push(querySnapshot.docs[0].id);
            this.newUserEmails.push(email);
          } else {
            this.negativeFeedback = 'User not found in system.'
          }
        });
      },
      submitNewUsers: function() {
        let promises = [];
        this.newUserIds.forEach(userId => {
          promises.push(
            db.collection('teams').doc(this.teamId).update({
              users: firebase.firestore.FieldValue.arrayUnion(userId),
            })
          );
        }, this);
        Promise.all(promises).then(_ => {
          this.positiveFeedback = 'Users submitted';
          this.newUserIds = '';
          this.newUserEmails = '';
        });
      }
    },
    computed: {
      userIsAdmin: function() {
        if (this.user) {
          return this.user.uid === this.teamInfo.adminUserId;
        }
      }
    },
    created: function() {
      this.getTeamInfo().then(documentSnapshot => {
        this.teamInfo = documentSnapshot.data();
        this.getTeamRezolutions();
      });
    }
  }
</script>

<style>
  .my-tables {
    padding: 20px 60px;
    margin: 10% auto;
  }
  
  input#newUser {
    width: 80%;
  }
</style>