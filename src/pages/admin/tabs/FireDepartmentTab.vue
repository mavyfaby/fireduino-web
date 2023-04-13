<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button @click="openFireDepartments" label="Fire Department">
        <md-icon slot="icon">add</md-icon>
      </md-filled-button>
    </div>

    <div class="table">
      <table>
        <thead>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Coordinates</th>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";

import { useStore } from "~/store";

const store = useStore();

function openFireDepartments() {
  store.dialog.addFireDepartments.open = true;
}
</script>