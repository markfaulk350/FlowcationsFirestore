<template>
  <nav>
    <v-toolbar app flat>
      <v-img
        :src="require('../assets/wind.svg')"
        alt="Wind Burger"
        aspect-ratio="1"
        max-width="40px"
        max-height="40px"
        @click="drawer = !drawer"
      />
      <v-toolbar-title left class="text-uppercase">
        <span>Flow</span>
        <span class="font-weight-light">cations</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-tooltip bottom>
        <v-btn slot="activator" fab flat v-on:click="$emit('changeTheme')">
          <v-icon>invert_colors</v-icon>
        </v-btn>
        <span>Change Theme</span>
      </v-tooltip>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="grey darken-4">
      <v-list dark>
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          :active-class="link.color"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <Popup/>
      </v-list>
      <v-img :src="require('../assets/WingTrace.svg')" alt="paramotor"/>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import Popup from "./Popup";
import LogoBurger from "./LogoBurger"

export default {
  components: { Popup, LogoBurger },
  name: "Navbar",
  data() {
    return {
      drawer: false,
      themeColor: false,
      links: [
        {
          icon: "fingerprint",
          text: "About",
          route: "/",
          color: "orange--text"
        },
        {
          icon: "terrain",
          text: "Explore",
          route: "/explore",
          color: "light-blue--text"
        },
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/dashboard",
          color: "red--text"
        },
        {
          icon: "storage",
          text: "API Documentation",
          route: "/docs",
          color: "yellow--text"
        },
        {
          icon: "360",
          text: "How-To",
          route: "/howto",
          color: "green--text"
        },
        {
          icon: "360",
          text: "Orientate",
          route: "/orient",
          color: "green--text"
        }
      ]
    };
  }
};
</script>