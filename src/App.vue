<template>
  <div class="container mx-auto px-4 h-full">
    <v-appbar />
    <router-view />

    <LogoutDialog />
  </div>
</template>

<script lang="ts" setup>
import VAppbar from "~/components/VAppbar.vue";
import LogoutDialog from "./dialogs/LogoutDialog.vue";

import { setDefaultTheme } from './theme';

setDefaultTheme();
</script>
