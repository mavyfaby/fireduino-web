<template>
  <div class="container mx-auto px-4 h-full">
    <v-appbar />
    <router-view />

    <MainDialog />
    <LogoutDialog />
  </div>
</template>

<script lang="ts" setup>
import VAppbar from "./components/VAppbar.vue";
import MainDialog from "./components/dialogs/MainDialog.vue";
import LogoutDialog from "./components/dialogs/LogoutDialog.vue";

import { setDefaultTheme } from './theme';

setDefaultTheme();
</script>
