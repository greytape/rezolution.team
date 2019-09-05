<template>
  <div class="container">
    <div class="col s12 card my-tables">
      <h4>{{ teamInfo.name }}</h4>
      <h6>{{ teamInfo.description }}</h6>
      <table>
        <tr>
          <td>Rezolution</th>
          <td>Owner</td>
          <th>Update Frequency</th>
          <th>Latest Update</th>
          <th>Date of latest Update</th>
          <th>Status</th>
        </tr>
        <tr v-for="rezolution in teamRezolutions">
          <td>{{ rezolution.name }} </td>
          <td>{{ rezolution.owner }} </td>
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
        teamRezolutions: [],
        teamId: this.$route.params.teamId,
        teamInfo: [],
      };
    },
    methods: {
      getTeamRezolutions: function() {
        db.collection('rezolutions').get().then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            let rezolutionId = Object.keys(doc.data())[0];
            let data = doc.data()[rezolutionId];
            if (data.teamId === this.teamId) {
              this.teamRezolutions.push(data);
            }
          }, this);
        }).then(_ => {
          this.addLatestUpdates();
        });
      },
      addLatestUpdates: function() {
        for (let rezolution in this.teamRezolutions) {
          db.collection('updates').doc(this.teamRezolutions[rezolution].id).get().then(
          (documentSnapshot) => {
            if (documentSnapshot.data()) {
              let updates = documentSnapshot.data().updatesArray;
              this.$set(this.teamRezolutions[rezolution], 'latestUpdate', updates[updates.length - 1]);
            }
          });
        }
      },
      getTeamInfo: function() {
        db.collection('teams').doc(this.teamId).get().then(documentSnapshot => {
            this.teamInfo = documentSnapshot.data();
        });
      },
    },
    created: function() {
      this.getTeamRezolutions();
      this.getTeamInfo();
    }
  }
</script>

<style>
  .my-tables {
    padding: 20px 60px;
    margin: 10% auto;
  }

</style>