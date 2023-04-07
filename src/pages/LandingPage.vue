<template>
  <div>
    <div class="main-container">
      <div class="flex flex-col">
        <div class="text-sm lg:text-base">INTRODUCING</div>
        <h2 class="text-5xl lg:text-6xl font-bold my-7">Fireduino</h2>
        <h6 class="text-sm mx-10 lg:mx-0 lg:text-lg tracking-wide leading-6">
          An advanced fire detection and extinguishing systems, along with automated alerts to the nearest fire station
        </h6>
        <div class="flex justify-center lg:justify-start">
          <md-filled-button class="mt-8" label="Get Started" />
        </div>
      </div>
      <div class="flex justify-center lg:justify-end">
        <img
          :src="store.dark ? previewImageDark : previewImageLight"
          class="w-64 lg:w-[300px] mt-16"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import previewImageLight from "~/assets/img/mobile-light.png";
import previewImageDark from "~/assets/img/mobile-dark.png";

import "@material/web/button/filled-button";

import { useStore } from "~/store";

const store = useStore();
</script>

<style scoped>
.main-container {
  @apply flex flex-col text-center lg:grid grid-cols-2
    lg:gap-10 lg:text-start lg:flex-row items-center mt-16 p-4;
}
</style>
