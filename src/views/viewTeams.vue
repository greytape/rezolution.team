<template>
  <div class="container">
    <div class="col s12 card my-tables">
      <h4>{{ teamInfo.name }}</h4>
      <h6>{{ teamInfo.description }}</h6>
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
  </div>
</template>

<script>
  import { db } from '@/firebase/init'
  export default { 
    data: function() {
      return {
        teamRezolutions: {},
        teamId: this.$route.params.teamId,
        teamInfo: {},
      };
    },
    methods: {
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

</style>