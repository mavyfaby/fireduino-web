<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button :disabled="isLoading" @click="openAddFireDepartmentDialog" label="Fire Department">
        <md-icon slot="icon">add</md-icon>
      </md-filled-button>
    </div>

    <div class="flex justify-center">
      <md-circular-progress v-if="isLoading" indeterminate class="mt-4" />
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-5 mt-7">
      <div class="h-full" v-for="(dept, i) of departments" :key="dept.id">
        <EntityCard
          :type="2"
          :index="i"
          :name="dept.name"
          :address="dept.address"
          :phone="dept.phone"
          :latitude="dept.latitude"
          :longitude="dept.longitude"
          :date-stamp="dept.date_stamp"
        />
      </div>
    </div>

    <!-- <div class="table">
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
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import type { FireDepartment } from "~/types";
import { TYPE } from "vue-toastification";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";

import EntityCard from "~/components/EntityCard.vue";

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
        // Validate location
        if (!('latitude' in entity)) {
          throw new Error("Latitude is required");
        }

        if (!('longitude' in entity)) {
          throw new Error("Longitude is required");
        }

        // Send request
        makeRequest("POST", Endpoints.Department, {
          name: entity.name,
          phone: entity.phone,
          address: entity.address,
          latitude: entity.latitude,
          longitude: entity.longitude,
        }, (err, response) => {
          if (err) {
            callback(false);
            return;
          }
          
          // Show message
          showToast(TYPE.SUCCESS, response.message);
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
        longitude: d.f,
        date_stamp: d.g
      });
    }

    departments.value = depts;
    isLoading.value = false;
  });
}
</script>