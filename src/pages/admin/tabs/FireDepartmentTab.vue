<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button @click="openAddFireDepartmentDialog" label="Fire Department">
        <md-icon slot="icon">add</md-icon>
      </md-filled-button>
    </div>
    <div class="table">
      <table class="w-full text-sm text-left">
        <thead class="text-xs uppercase">
          <tr>
            <th scope="col" class="px-4 py-3">#</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Coordinates</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dep, i) of departments" :key="dep.id">
            <td>{{ i + 1 }}</td>
            <td>{{ dep.name }}</td>
            <td>{{ dep.phone }}</td>
            <td>{{ dep.address }}</td>
            <td>{{ dep.latitude }}, {{ dep.longitude }}</td>
            <td>
              <md-standard-icon-button @click="onEdit(dep.id)">edit</md-standard-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/button/filled-button";
import "@material/web/iconbutton/standard-icon-button";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import makeRequest, { Endpoints } from "~/network/request";

import type { FireDepartment } from "~/types";

const store = useStore();
const departments = ref<FireDepartment[]>([]);

function onEdit(id: number | undefined) {
  if (id === undefined) {
    return;
  }
}

function openAddFireDepartmentDialog() {
  store.dialog.addFireDepartments.isOpen = true;
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