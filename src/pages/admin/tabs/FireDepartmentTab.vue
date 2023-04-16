<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button :disabled="isLoading" @click="openAddFireDepartmentDialog" label="Fire Department">
        <md-icon slot="icon">add</md-icon>
      </md-filled-button>
    </div>
    <div class="table">
      <md-circular-progress v-if="isLoading" indeterminate class="mt-4" />
      
      <table v-else class="w-full text-sm text-left">
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
import type { FireDepartment } from "~/types";
import { TYPE } from "vue-toastification";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";

const store = useStore();
const departments = ref<FireDepartment[]>([]);
const isLoading = ref(true);

function onEdit(id: number | undefined) {
  if (id === undefined) {
    return;
  }
}

function openAddFireDepartmentDialog() {
  store.dialog.entity.open({
    title: "Add Fire Department",
    entity: "department",
    acceptAction: {
      name: "Add Department",
      action: (entity, callback) => {
        // Send request
        makeRequest("POST", Endpoints.Department, {
          name: entity.name,
          phone: entity.phone,
          address: entity.address,
          latitude: entity.latitude,
          longitude: entity.longitude,
        }, (err, response) => {
          // Show message
          showToast(err || !response.success ? TYPE.ERROR : TYPE.SUCCESS, response.message);
          
          if (err) {
            callback(false);
            return;
          }
          
          // Reset inputs
          callback(true);
          // Fetch new departments
          getFireDepartments();
        });
      }
    }
  });
}

onMounted(getFireDepartments);

function getFireDepartments() {
  isLoading.value = true;

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
    isLoading.value = false;
  });
}
</script>