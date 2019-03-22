<template>
  <div>
      <span>Please work!</span>
    <ul>
      <li>{{absolute}}</li>
      <li>{{alpha}}</li>
      <li>{{beta}}</li>
      <li>{{gamma}}</li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "Orientation",
  data() {
    return {
      absolute: null,
      alpha: null,
      beta: null,
      gamma: null
    };
  },
  methods: {},
  created() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", deviceOrientationHandler, false);
      console.log("Supported!");
    } else {
        console.log("Not Supported!");
    }
  }
};
</script>

<style>
</style>
