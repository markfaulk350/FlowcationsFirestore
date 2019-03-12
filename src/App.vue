<template>
  <v-app :dark="isDark">
    <Navbar v-on:changeTheme="isDark = !isDark"/>
    <v-content>
      <!--Ususally all of the page content goes here, headers and footers will be elsewhere -->
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isDark: false
      //
    };
  }
};
</script>
