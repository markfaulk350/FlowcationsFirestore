<template>
  <div class="google-map" :id="mapName">
    <v-container fill-height>
      <v-layout align-center justify-center>
        <v-progress-circular
          :size="70"
          :width="7"
          color="black"
          indeterminate
          v-if="dataIsLoading === true"
        >Loading</v-progress-circular>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "../components/firebaseInit";
import moment from "moment";

export default {
  data: function() {
    return {
      mapName: this.name + "-map",
      dataIsLoading: true
    };
  },
  methods: {
    getLocations() {
      const dataToPass = [];
      db.collection("flowcations")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              name: doc.data().location_name,
              status: doc.data().status,
              created_by: doc.data().created_by,
              updated: this.findDate(doc.data().updated.seconds),
              lat: doc.data().coordinates.latitude,
              lng: doc.data().coordinates.longitude
            };
            dataToPass.push(data);
          });
          return dataToPass;
        })
        .then(dataToPass => this.initMap(dataToPass));
    },
    initMap(myData) {
      const markers = [];
      const infoWindows = [];
      const map = new google.maps.Map(document.getElementById(this.mapName), {
        zoom: 4,
        center: { lat: 32.889626, lng: -117.251286 }
      });
      myData.forEach(place => {
        let latLng = new google.maps.LatLng(place.lat, place.lng);
        // REMEBER TO CHANGE THE LINK WHEN YOU DEPLOY
        let contentString = `<h1><a href="https://faulknermark.com/#/location/${place.id}">${place.name}</a></h1><br><h3 style="color:black">Status: ${place.status}</h3>`;
        let infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        let marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
        marker.addListener("click", function() {
          infoWindow.open(this.map, this);
          map.setZoom(15);
          map.setCenter(marker.getPosition());
        });
        infoWindows.push(infoWindow);
        markers.push(marker);
      });
      const markerCluster = new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      });
      this.dataIsLoading = false;
    },
    findDate(date) {
      return moment(date * 1000).format("MMMM Do YYYY");
    }
  },
  mounted: function() {
    this.getLocations();
  }
};
</script>

<style>
.google-map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: gray;
}
</style>