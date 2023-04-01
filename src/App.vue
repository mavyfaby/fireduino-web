<template>
  <div class="container mx-auto px-4">
    <router-view />
  </div>
</template>

<script setup>


import { setDefaultTheme } from './theme';

setDefaultTheme();
</script>
