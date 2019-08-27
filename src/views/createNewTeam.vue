<template>
  <div class="container">
    <form class="card new-team-form">
      <h5 class="light-green-text text-darken-4">Create New Team</h5>
      <div class="row">
        <div class="input-field col s12">
          <input id="name" v-model="newTeam.name" type="text" class="validate">
          <label for="name">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" v-model="newTeam.description" class="validate materialize-textarea"></textarea>
          <label for="description">Description</label>
        </div>
      </div>
      <div class="row">
        <button class="btn waves-effect waves-light light-green darken-4" @click.prevent="submitForm" type="submit" name="action">Submit <i class="material-icons right">send</i></button>
      </div>
    </form>
  </div>

</template>


<script>
  import db from '@/firebase/init'
  import firebase from 'firebase'

  export default {
    data: function() {
      return { 
        newTeam: {
          name: '',
          description: '',
        },
      };
    },
    methods: {
      submitForm: function() {
        let teamId;
        let memberId = this.$route.params.memberId;
        db.collection('teams').add(this.newTeam).then(ref => {
          teamId = ref.id;
          ref.update({ id: teamId});
        }).then( _ => {
          db.collection('teams').doc(teamId).update({
            members: firebase.firestore.FieldValue.arrayUnion(memberId),
          });
        })
        this.$router.push('/myAccount/' + memberId);
      },
    },
  }

</script>


<style>
  .new-team-form {
    padding: 20px 60px;
    margin: 10% auto;
    width: 70%;
  }

</style>