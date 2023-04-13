<template>
  <div class="flex justify-between p-4">
    <div class="left">
      <v-logo />
    </div>
    <div class="right">
      <md-text-button v-if="route.name === 'Admin'" @click="onLogout" label="Logout" />
      <md-switch @click="changeTheme" :selected="isDarkMode()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VLogo from "./VLogo.vue";

import "@material/web/icon/icon";
import "@material/web/switch/switch";
import "@material/web/button/text-button";
import "@material/web/button/tonal-button";
import "@material/web/dialog/dialog";

import { useRoute } from "vue-router";
import { useStore } from "~/store";
import { setDefaultTheme, isDarkMode } from "~/theme";

const route = useRoute();
const store = useStore();

function onLogout() {
  store.dialog.logout.open = true;
}

function changeTheme(ev: any) {
  setDefaultTheme(ev.target.button.ariaChecked === "true");
}
</script>

<style scoped>
.left, .right {
  @apply flex items-center;
}

.right {
  @apply space-x-4;
}
</style>