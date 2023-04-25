<template>
  <div class="appbar flex justify-between p-4">
    <div class="left">
      <v-logo />
    </div>
    <div class="right">
      <md-text-button v-if="route.name === 'Admin'" @click="onLogout">
        Logout
      </md-text-button>
      <md-switch @click="changeTheme" :selected="isDarkMode()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import VLogo from "./VLogo.vue";

import anime from "animejs/lib/anime.es.js";
import { useRoute } from "vue-router";
import { useStore } from "~/store";
import { setDefaultTheme, isDarkMode } from "~/theme";

const store = useStore();
const route = useRoute();

onMounted(() => {
  // Animate appbar only on Lannding page
  if (location.pathname === "/") {
    anime({
      targets: ".appbar",
      translateY: [-50, 0],
      delay: 750,
      duration: 1000,
      easing: 'easeOutElastic(0.5, 0.4)',
    });
  }
});

function onLogout() {
  store.dialog.logout.isOpen = true;
}

function changeTheme(ev: any) {
  setDefaultTheme(ev.target.button.ariaChecked === "true");
}
</script>

<style lang="scss" scoped>
.left, .right {
  @apply flex items-center;
}

.right {
  @apply space-x-4;
}
</style>