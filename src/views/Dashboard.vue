<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <!--<v-progress-linear :indeterminate="true" v-if="flowcations.length == 0"></v-progress-linear>-->
      <v-card flat v-for="location in flowcations" :key="location.id">
        <v-layout row wrap :class="`pa-3 project ${location.status}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">Location Name</div>
            <router-link :to="{ name: 'Location', params: { location_id: `${location.id}` }}">
              <div>{{location.name}}</div>
            </router-link>
          </v-flex>
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Created by</div>
            <div>{{location.created_by}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Updated on</div>
            <div>{{location.updated}}</div>
          </v-flex>
          <v-flex xs6 sm3 md2>
            <div>
              <v-chip medium :class="`${location.status} caption my-2`">{{location.status}}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm1 md1>
            <div>
              <v-btn v-on:click="deleteLocation(location.id)" fab small class="red--text">X</v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "../components/firebaseInit";
import { eventBus } from "../main";
import moment from "moment";

export default {
  name: "Dashboard",
  data() {
    return {
      flowcations: []
    };
  },
  methods: {
    deleteLocation(locationID) {
      db.collection("flowcations")
        .doc(locationID)
        .delete()
        .then(doc => {
          //console.log("Document successfully deleted!");
          this.flowcations = this.flowcations.filter(location => location.id !== locationID);
        })
        .catch(function(error) {
          //console.error("Error removing document: ", error);
        });
    },
    findDate(date) {
      return moment(date * 1000).format("MMMM Do YYYY");
    }
  },
  created() {
    db.collection("flowcations")
      .orderBy("created", "desc")
      .limit(30)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            name: doc.data().location_name,
            status: doc.data().status,
            created_by: doc.data().created_by,
            updated: this.findDate(doc.data().updated.seconds)
          };
          this.flowcations.push(data);
        });
      });
  }
};
</script>

<style scoped>
.project.Open {
  border-left: 4px solid #2ecc40;
}

.project.Closed {
  border-left: 4px solid #ff4136;
}

.project.Volatile {
  border-left: 4px solid #ffdc00;
}

.v-chip.Open {
  border-left: 4px solid #2ecc40;
  border-right: 4px solid #2ecc40;
}

.v-chip.Closed {
  border-left: 4px solid #ff4136;
  border-right: 4px solid #ff4136;
}

.v-chip.Volatile {
  border-left: 4px solid #ffdc00;
  border-right: 4px solid #ffdc00;
}

</style>
