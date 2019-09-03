<template>
  <div class="container">
    <form class="card new-rezolution-form">
      <h5 class="light-green-text text-darken-4">Create New Rezolution</h5>
      <div class="row">
        <div class="input-field col s12">
          <input id="name" v-model="newRezolution.name" type="text" class="validate">
          <label for="name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" v-model="newRezolution.description" class="validate materialize-textarea">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias adipisci facilis porro officiis ad facere consequuntur et mollitia hic iure eius quas, quasi possimus maxime aperiam minima dicta sed similique!</textarea>
          <label for="description">Description</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <label for="updateFrequency">Update Frequency</label>
          <select v-model="newRezolution.updateFrequency" id="updateFrequency">
            <option disabled value="">Please select one</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div class="row">
          <div class="col s12">
            <label for="select-team">Select Team</label>
            <select v-model="newRezolution.teamId" id="select-team">
              <option value="none">None</option>
              <option v-for="team in myTeams" :value="team.id">{{ team.name }}</option>
            </select>
          </div>
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

  export default {
    data: function() {
      return { 
        newRezolution: {
          name: '',
          description: '',
          updateFrequency: '',
          id: '',
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
        let rezolutionRef = this.randomId();
        this.newRezolution.teamName = this.getChosenTeamName;
        this.newRezolution.id = rezolutionRef;
        db.collection('rezolutions').doc(userId).update({
          [rezolutionRef]: this.newRezolution,
        });
        db.collection('updates').doc(rezolutionRef).set({
          'updatesArray': [],
        }).catch(err => console.log(err.message));
        this.$router.push('/myAccount/' + userId);
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
      randomId: function() {
        const alphanum = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
        let result = '';
        for (let idx = 0; idx < 10; idx +=1) {
          result = result.concat(alphanum[Math.floor(Math.random() * alphanum.length)]);
        }
        return result;
      },
      getOwner: function() {
        db.collection('users').doc(this.userId).get().then(doc => {
          this.newRezolution.owner = doc.data().firstName + ' ' + doc.data().lastName;
        });
      },
    },
    computed: {
      getChosenTeamName: function() {
        let chosenTeam = '';
        if (this.newRezolution.teamId) {
          chosenTeam = this.myTeams.filter(team => {
            return team.id === this.newRezolution.teamId;
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
      this.getOwner();
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    },
    beforeUpdate: function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    },
  }

</script>


<style>
  .new-rezolution-form {
    padding: 20px 60px;
    margin: 10% auto;
    width: 70%;
  }

</style>