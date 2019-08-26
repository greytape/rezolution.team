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
        newRezolution: {
          name: '',
          description: '',
          updateFrequency: '',
        },
      };
    },
    methods: {
      submitForm: function() {
        let memberId = this.$route.params.memberId;
        db.collection('members').doc(memberId).update({
          rezolutions: firebase.firestore.FieldValue.arrayUnion(this.newRezolution)
        });
        this.$router.push('/myAccount/' + memberId);
      },
    },
    mounted: function() {
      var elems = document.querySelectorAll('select');
      var options = document.querySelectorAll('option');
      var instances = M.FormSelect.init(elems, options);
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