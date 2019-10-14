<template>
  <div class="container">
    <router-link :to="'/myAccount/' + user.uid" ><button class="back-button btn light-green darken-4"><i class="inline-icon material-icons">arrow_back</i>my account</button></router-link>
    <div class="col s12 card my-tables">
      <table>
        <h6>Rezolution Info</h6>
        <tr>
          <th>Rezolution</th>
          <th>Owner</th>
          <th>Team</th>
          <th>Update Frequency</th>
        </tr>
        <tr>
          <td>{{ rezolutionInfo.name }} </td>
          <td>{{ rezolutionInfo.userName }} </td>
          <td>{{ rezolutionInfo.teamName }} </td>
          <td>{{ rezolutionInfo.updateFrequency }} </td>
        </tr>
      </table>
    </div>
    <div class="col s12 card my-tables">
      <table>
        <h6>Updates Info</h6>
        <tr>
          <th>Update</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
        <tr v-for="update in rezolutionUpdates" :key="update.id" :class="rezolutionFormat(update)">
          <td>{{ update.commentary }} </td>
          <td>{{ update.date }} </td>
          <td>{{ update.status }} </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
  import { db } from '@/firebase/init'

  export default {
    props: ['user'],
    data: function() {
      return {
        rezolutionId: this.$route.params.rezolutionId,
        rezolutionInfo: {},
        rezolutionUpdates: [],
      };
    },
    methods: {
      fetchRezolutionInfo: function() {
        db.collection('rezolutions').where('id', '==', this.rezolutionId).get()
        .then(querySnapshot => {
          this.rezolutionInfo = querySnapshot.docs[0].data();
        });
      },
      fetchUpdateData: function() {
        db.collection('updates').where('rezolutionId','==', this.rezolutionId).orderBy('timestamp').get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.rezolutionUpdates.push(doc.data());
            }, this);
            this.$forceUpdate();
        });
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
      this.fetchRezolutionInfo();
      this.fetchUpdateData();
    },
  }
</script>


<style>
  .back-button {
    margin: 20px 0;
  }

  .inline-icon {
    vertical-align: bottom;
    font-size: 18px;
  }
</style>