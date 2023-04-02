<template>
  <div class="flex items-center gap-2">
    <img class="w-8 h-8" :src="fireduinoLogo" alt="Fireduino Logo" />
    <span class="text-xl font-bold on-background">Fireduino</span>
  </div>
</template>

<script setup>
import fireduinoLogo from "~/assets/svg/fireduino.svg?url";
</script>