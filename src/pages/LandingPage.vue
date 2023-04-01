<template>
  <div>
    <v-appbar />

    <div class="flex flex-col text-center items-center mt-16">
      <div class="text-sm">INTRODUCING</div>
      <h2 class="text-5xl font-bold my-7">Fireduino</h2>
      <h6 class="text-sm">
        A fire safety system featuring advanced fire detection and extinguishing systems,
        along with automated alerts to the nearest fire station
      </h6>
      <div class="flex justify-center">
        <md-filled-button class="mt-8" label="Get Started" />
      </div>
    </div>
  </div>
</template>

<script setup>
import VAppbar from "~/components/VAppbar.vue";

import "@material/web/button/filled-button";
</script>

<style scoped>

</style>
