<template>
  <v-footer v-if="this.$route.name != 'Explore'" class="pa-3">
    <v-layout v-resize="onResize" column align-center justify-center>{{ windowSize }}</v-layout>
    
    <div>&copy; {{ new Date().getFullYear() }} </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      windowSize: {
        x: 0,
        y: 0
      }
    };
  },
  created() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    }
  }
};
</script>
