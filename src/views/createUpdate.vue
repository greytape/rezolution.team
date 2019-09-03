<template>

  <div class="container">
    <form class="card new-team-form">
      <h5 class="light-green-text text-darken-4">Provide Update</h5>
      <div class="row">
        <div class="input-field col s12">
          <textarea id="description" v-model="newUpdate.commentary" class="validate materialize-textarea"></textarea>
          <label for="description">Commentary</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <label for="status">Status</label>
          <select v-model="newUpdate.status" id="status">
            <option disabled value="">Please select one</option>
            <option value="red">Red</option>
            <option value="amber">Amber</option>
            <option value="green">Green</option>
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
        newUpdate: {
          id: '',
          commentary: '',
          status: '',
        },
      };
    },
    methods: {
      submitForm: function() {
        let rezolutionId = this.$route.params.rezolutionId;
        let userId = this.$route.params.userId;
        this.newUpdate.date = this.getDateCreated();
        db.collection('updates').doc(rezolutionId).update({
          updatesArray: firebase.firestore.FieldValue.arrayUnion(this.newUpdate),
        });
        this.$router.push('/myAccount/' + userId);
      },
      getDateCreated: function() {
        let date = new Date();
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      },
      randomId: function() {
        const alphanum = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
        let result = '';
        for (let idx = 0; idx < 10; idx +=1) {
          result = result.concat(alphanum[Math.floor(Math.random() * alphanum.length)]);
        }
        return result;
      },
    },
    mounted: function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems);
    },
  }

</script>

<style></style>