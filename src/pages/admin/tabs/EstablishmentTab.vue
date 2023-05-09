<template>
  <div class="mb-10">
    <div class="flex justify-end">
      <md-filled-button :disabled="isLoading" @click="openAddEstablishmentDialog">
        <md-icon slot="icon">add</md-icon> Establishment
      </md-filled-button>
    </div>
    <div class="flex justify-center">
      <md-circular-progress v-if="isLoading" indeterminate class="mt-4" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-5 mt-7">
      <div class="h-full" v-for="(estb, i) of establishments" :key="estb.id">
        <EntityCard
          :type="1"
          :index="i"
          :name="estb.name"
          :address="estb.address"
          :latitude="estb.latitude"
          :longitude="estb.longitude"
          :phone="estb.phone"
          :invite-key="formatInviteKey(estb.invite_key)"
          :date-stamp="estb.date_stamp"
          @edit="onEdit(estb)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Establishment } from "~/types";
import { TYPE } from "vue-toastification";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import { formatInviteKey } from "~/utils/string";

import EntityCard from "~/components/EntityCard.vue";

import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";

const store = useStore();
const establishments = ref<Establishment[]>([]);
const isLoading = ref(true);

onMounted(getEstablishments);

/**
 * Edit an establishment
 */
 function onEdit(estb: Establishment) {
  if (estb.id === null) {
    return;
  }

  store.dialog.entity.open({
    title: "Edit Establishment",
    entity: "establishment",
    estb,
    acceptAction: {
      name: "Edit Establishment",
      action: (entity, callback) => {
        // Validate location
        if (!('latitude' in entity)) {
          throw new Error("Latitude is required");
        }

        if (!('longitude' in entity)) {
          throw new Error("Longitude is required");
        }

        // Send request
        makeRequest("PUT", Endpoints.Establishment, {
          id: entity.id,
          name: entity.name,
          phone: entity.phone,
          address: entity.address,
          latitude: entity.latitude,
          longitude: entity.longitude,
          inviteKey: "-"
        }, (err, response) => {
          if (err) {
            callback(false);
            return;
          }
          
          // Show message
          showToast(TYPE.SUCCESS, response.message);
          // Reset inputs
          callback(true);
          // Fetch establishments
          getEstablishments();
        });
      }
    }
  });
}


/**
 * Opens the add establishment dialog
 */
function openAddEstablishmentDialog() {
  store.dialog.entity.open({
    title: "Add Establishment",
    entity: "establishment",
    acceptAction: {
      name: "Add Establishment",
      action: (entity, callback) => {
        // Validate invite key
        if (!('invite_key' in entity)) {
          throw new Error("Invite key is required");
        }

        // Send request
        makeRequest("POST", Endpoints.Establishment, {
          name: entity.name,
          phone: entity.phone,
          address: entity.address,
          latitude: entity.latitude,
          longitude: entity.longitude,
          inviteKey: entity.invite_key
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
          getEstablishments();
        });
      }
    }
  });
}

/**
 * Fetches all establishments
 */
function getEstablishments() {
  isLoading.value = true;

  makeRequest("GET", Endpoints.Establishments, null, (error, response) => {
    if (error) {
      return;      
    }
    
    const estabs: Establishment[] = [];

    for (const d of response.data) {
      estabs.push({
        id: d.a,
        invite_key: d.b,
        name: d.c,
        phone: d.d,
        address: d.e,
        latitude: d.f,
        longitude: d.g,
        date_stamp: d.h
      });
    }

    establishments.value = estabs;
    isLoading.value = false;
  });
}
</script>