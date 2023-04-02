<template>
  <div class="flex justify-between p-4">
    <div class="left">
      <v-logo />
    </div>
    <div class="right">
      <md-switch @click="changeTheme" :selected="isDarkMode()" />
    </div>
  </div>
</template>

<script setup>
import VLogo from "./VLogo.vue";

import { setDefaultTheme, isDarkMode } from "~/theme";

import "@material/web/switch/switch";

function changeTheme(ev) {
  setDefaultTheme(ev.target.button.ariaChecked === "true");
}
</script>

