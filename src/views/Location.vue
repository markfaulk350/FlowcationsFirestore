<template>
  <div class="location">
    <div class="aspect-ratio" :class="`${status}`" v-html="vr">{{vr}}</div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 md8>
          <h1>{{location_name}} - {{status}}</h1>
        </v-flex>
        <v-flex xs12 md4>
          <h2>{{lat}}, {{lng}}</h2>
        </v-flex>
      </v-layout>
    </v-container>
    I need to add an If statement to render the 360 and the colored border In the case that no 360 content Exists.
  </div>
</template>

<script>
import db from "../components/firebaseInit";

export default {
  name: "Location",
  data() {
    return {
      location_name: "",
      lat: null,
      lng: null,
      vr: null,
      description: null,
      status: null
    };
  },
  beforeCreate() {
    db.collection("flowcations")
      .doc(`${this.$route.params.location_id}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          const { location_name, description, vr_embed, status } = doc.data();
          this.vr = vr_embed;
          this.location_name = location_name;
          this.status = status;
          this.lat = doc.data().coordinates.latitude;
          this.lng = doc.data().coordinates.longitude;
        } else {
          console.log("No Document Exists");
        }
      })
      .catch(error => {
        console.log("Error getting document", error);
      });
  }
};
</script>

<style scoped>
.aspect-ratio {
  position: relative;
  width: 100%;
  height: 555px;
}



.Volatile {
  border-bottom: 5px solid #ffdc00;
}

.Closed {
  border-bottom: 5px solid #ff4136;
}

.Open {
  border-bottom: 5px solid #2ecc40;
}
</style>
