<template>
  <md-dialog :open="store.dialog.main.isOpen" @closed="onClose" scrimClickAction="">
    <div slot="header">{{ store.dialog.main.title }}</div>

    {{ store.dialog.main.content }}

    <div class="flex space-x-3" slot="footer">
      <md-text-button v-for="btn of store.dialog.main.actions" :key="btn" @click="btn.action" :label="btn.name" />
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/button/text-button";
import { useStore } from "~/store";

const store = useStore();

function onClose() {
  store.dialog.main.isOpen = false;
}
</script>