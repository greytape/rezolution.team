<template>
  <div class="container">
    <router-link :to="'/myAccount/' + this.$route.params.userId" ><button class="back-button btn light-green darken-4"><i class="inline-icon material-icons">arrow_back</i>my account</button></router-link>
    <form class="card edit-rezolution-form">
      <h5 class="light-green-text text-darken-4">Edit Rezolution</h5>
      <div class="row">
        <div class="input-field col s12">
          <input id="name" v-model="editedRezolution.name" type="text" class="validate">
          <label class="active" for="name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" v-model="editedRezolution.description" class="active validate materialize-textarea"></textarea>
          <label for="description">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <label for="updateFrequency">Update Frequency</label>
          <select v-model="editedRezolution.updateFrequency" id="updateFrequency">
            <option disabled value="">Please select one</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light light-green darken-4" @click.prevent="submitForm" type="submit" name="action">Submit <i class="material-icons right">send</i></button>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase/init'
import firebase from 'firebase/app'

export default {

  data: function() {
    return { 
      editedRezolution: {
        name: '',
        description: '',
        updateFrequency: '',
        id: this.$route.params.rezolutionId,
        userId: '',
        userName: '',
        teamId: '',
        teamName: '',
      },
      userId: this.$route.params.userId,
      myTeams: [],
    };
  },
  methods: {
    submitForm: function() {
      let userId = this.$route.params.userId;
      db.collection('rezolutions').doc(this.editedRezolution.id)
        .set({
            description: this.editedRezolution.description,
            description: this.editedRezolution.name,
          },
          {merge: true},
        );
      this.$forceUpdate();
      this.$router.push('/myAccount/' + userId);
    },
    deleteRezolution: function() {

    },
    fetchTeamData: function() {
      let myTeams = db.collection('teams').where('users', 'array-contains', this.userId);
      let myTeamsLocal = [];
      myTeams.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          myTeamsLocal.push(doc.data());
        });
      });
      this.myTeams = myTeamsLocal;
    },
    getUser: function() {
      this.editedRezolution.userId = this.userId;
      db.collection('users').doc(this.userId).get().then(doc => {
        this.editedRezolution.userName = doc.data().firstName + ' ' + doc.data().lastName;
      });
    },
    fetchRezolutionData: function() {
      db.collection('rezolutions').doc(this.editedRezolution.id).get()
      .then(doc => {
        let rezolutionData = doc.data();
        this.editedRezolution.name = rezolutionData.name;
        this.editedRezolution.description = rezolutionData.description;
        this.editedRezolution.updateFrequency = rezolutionData.updateFrequency;
      });
    },
  },
  computed: {
    getChosenTeamName: function() {
      let chosenTeam = '';
      if (this.editedRezolution.teamId === 'none') {
        return 'none';
      }
      if (this.editedRezolution.teamId) {
        chosenTeam = this.myTeams.filter(team => {
          return team.id === this.editedRezolution.teamId;
        });
        return chosenTeam[0].name
      }
      return chosenTeam;
    },
  },
  created: function() {
    this.fetchTeamData();
  },
  mounted: function() {
    this.getUser();
    this.fetchRezolutionData();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  },
  beforeUpdate: function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  },
  updated: function() {
    M.updateTextFields();
  },
}
</script>

<style scoped>
  .edit-rezolution-form {
    padding: 20px 60px;
    margin: 0 auto;
    width: 70%;
  }

  .back-button {
    margin: 20px 150px;
  }

  .inline-icon {
    vertical-align: bottom;
    font-size: 18px;
  }
</style>