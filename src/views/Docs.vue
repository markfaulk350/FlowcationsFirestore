<template>
  <div class="docs">
    <h1 class="subheading grey--text">API Documentation</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12>
          <span>
            <v-tooltip top>
              <v-btn
                v-clipboard:copy="baseURL"
                color="grey darken-3"
                small
                depressed
                fab
                dark
                slot="activator"
              >
                <v-icon med>attach_file</v-icon>
              </v-btn>
              <span>Copy to Clipboard</span>
            </v-tooltip>
          </span>
          <span class="title ma-3">
            <span>Base&nbsp;</span>
            <span class="font-weight-light">URL:</span>
            <span class="ml-3" light>{{baseURL}}</span>
          </span>
        </v-flex>
        <v-flex xs12 md6>
          <v-btn outline block>1</v-btn>
        </v-flex>
        <v-flex xs12 md6>
          <v-btn outline block>2</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Docs",
  data() {
    return {
      baseURL: "https://basic-vue-api.herokuapp.com/"
    };
  }
};
</script>


