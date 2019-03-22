<template>
  <div>
    <v-dialog max-width="95%" v-model="dialog" persistent>
      <v-btn class="align-center mx-5 mt-3" round color="grey darken-4" slot="activator">
        <v-icon left medium>add_location</v-icon>
        <span class="font-weight-light">add</span>
        <span>&nbsp;flow</span>
        <span class="font-weight-light">cation</span>
      </v-btn>
      <v-card>
        <v-card-title>
          <h2>
            <span class="font-weight-light">Create</span>
            <span>&nbsp;FLOW</span>
            <span class="font-weight-light">CATION</span>
          </h2>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field label="Location Name" v-model="locationName" prepend-icon="folder" :rules="inputRules"></v-text-field>
                </v-flex>
                <v-flex sm12 md4>
                  <v-text-field
                    type="number"
                    label="Lat"
                    v-model="lat"
                    prepend-icon="location_on"
                    :rules="gpsLatRules"
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md4>
                  <v-text-field
                    type="number"
                    label="Lon"
                    v-model="lon"
                    prepend-icon="location_on"
                    :rules="gpsLongRules"
                  ></v-text-field>
                </v-flex>

                <v-flex sm12 md4>
                  <v-select
                    :items="siteCondition"
                    label="Site Status"
                    v-model="siteStatus"
                    prepend-icon="favorite"
                    :rules="statusRules"
                  ></v-select>
                </v-flex>

                <v-flex xs12>
                  <v-select
                    prepend-icon="terrain"
                    :items="activities"
                    v-model="e6"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select activities at location"
                    multiple
                    chips
                    persistent-hint
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Description - optional" v-model="description" prepend-icon="edit"></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-textarea label="Embed 360 VR Site Intro - optional" v-model="vr" prepend-icon="code"></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <p>Need 360° Content Hosting? I highly recommend <a href="https://roundme.com/" target="_blank">Roundme</a>, <a href="https://kuula.co/" target="_blank">Kuula</a>, or <a href="https://veer.tv/" target="_blank">Veer</a>.</p>
                </v-flex>

                <v-btn @click="submit" flat class="mx-0 mt-3 grey darken-4 white--text">
                  <span class="font-weight-light">add</span>
                  <span>&nbsp;flow</span>
                  <span class="font-weight-light">cation</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="dialog = false" flat class="mx-0 mt-3 red darken-4 white--text">
                  <span>cancel</span>
                </v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {eventBus} from '../main';
import firebase from 'firebase/app'
import db from './firebaseInit';
import { error } from 'util';

export default {
  name: "Popup",
  data() {
    return {
      dialog: false,
      locationName: "",
      lon: null,
      lat: null,
      siteStatus: null,
      description: "",
      vr: "",
      e6: [],
      activities: [
        "Paragliding",
        "Paramotoring",
        "Speedflying",
        "Hang Gliding",
        "RC",
        "Base Jumping",
        "Hiking",
        "Mtn Biking",
        "Camping",
        "Off-Roading",
        "Hot Air Balloons"
      ],
      siteCondition: ["Open", "Volatile", "Closed"],
      inputRules: [
          v => v.length >= 3 || "Minimum length is 3 charecters"
      ],
      gpsLatRules: [
          v => parseFloat(v) <= 90 && parseFloat(v) >= -90 || "Out of range -90, 90"
      ],
      gpsLongRules: [
          v => parseFloat(v) <= 180 && parseFloat(v) >= -180 || "Out of range -180, 180"
      ],
      statusRules: [
          v => v != null || "Select One"
      ]
    };
  },
  methods: {
    submit() {
        if(this.$refs.form.validate()) {
        db.collection('flowcations').add({
            location_name: this.locationName,
            coordinates: new firebase.firestore.GeoPoint(parseFloat(this.lat), parseFloat(this.lon)),
            status: this.siteStatus,
            tags: this.e6,
            description: this.description,
            vr_embed: this.vr,
            created: new firebase.firestore.Timestamp(Math.floor(Date.now()/1000), 0),
            updated: new firebase.firestore.Timestamp(Math.floor(Date.now()/1000), 0)
        }).then(docRef => this.$router.push(`/location/${docRef.id}`))
        .catch(error => console.log(error));

        this.$refs.form.reset();
        this.locationName = "";
        this.lon = null;
        this.lat = null;
        this.siteStatus = null;
        this.description = "";
        this.vr = "";
        this.dialog = !this.dialog;

        }
      else {
          //console.log("the form has not been validated and will not submit");
      }
    }
  }
};
</script>
