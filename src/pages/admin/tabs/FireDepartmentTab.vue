<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button :disabled="isLoading" @click="openAddFireDepartmentDialog">
        <md-icon slot="icon">add</md-icon> Fire Department
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
          :id="dept.id!" 
          :name="dept.name"
          :address="dept.address"
          :phone="dept.phone"
          :latitude="dept.latitude"
          :longitude="dept.longitude"
          :date-stamp="dept.date_stamp"
          @edit="onEdit(dept)"
        />
      </div>
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

import EntityCard from "~/components/EntityCard.vue";

const store = useStore();
const departments = ref<FireDepartment[]>([]);
const isLoading = ref(true);

/**
 * Edit a fire department
 */
function onEdit(dept: FireDepartment) {
  if (dept.id === null) {
    return;
  }

  store.dialog.entity.open({
    title: "Edit Fire Department",
    entity: "department",
    dept,
    acceptAction: {
      name: "Edit Department",
      action: (entity, callback) => {
        // Validate location
        if (!('latitude' in entity)) {
          throw new Error("Latitude is required");
        }

        if (!('longitude' in entity)) {
          throw new Error("Longitude is required");
        }

        // Send request
        makeRequest("PUT", Endpoints.Department, {
          id: entity.id,
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

/**
 * Add a fire department
 */
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