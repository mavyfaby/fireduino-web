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
        <tbody v-if="departments.length > 0">
          <tr v-for="dep in departments" :key="dep.id">
            <td>{{ dep.name }}</td>
            <td>{{ dep.phone }}</td>
            <td>{{ dep.address }}</td>
            <td>{{ dep.latitude }}, {{ dep.longitude }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import makeRequest, { Endpoints } from "~/network/request";

import type { FireDepartment } from "~/types";

const store = useStore();
const departments = ref<FireDepartment[]>([]);

function openFireDepartments() {
  store.dialog.addFireDepartments.open = true;
}

onMounted(getFireDepartments);

function getFireDepartments() {
  makeRequest("GET", Endpoints.Departments, null, (error, response) => {
    if (error) {
      return;      
    }
    
    const depts: FireDepartment[] = [];

    for (const d of response.data) {
      depts.push({
        id: d.a,
        name: d.b,
        phone: d.c,
        address: d.d,
        latitude: d.e,
        longitude: d.f
      });
    }

    departments.value = depts;
  });
}
</script>