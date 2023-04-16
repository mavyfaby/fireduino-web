<template>
  <div>
    <div class="flex justify-end">
      <md-filled-button :disabled="isLoading" @click="openAddEstablishmentDialog" label="Establishment">
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
            <th scope="col" class="px-6 py-3">Invite Key</th>
            <th scope="col" class="px-6 py-3">Phone</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ent, i) of establishments" :key="ent.id">
            <td>{{ i + 1 }}</td>
            <td>{{ ent.name }}</td>
            <td>{{ formatInviteKey(ent.invite_key) }}</td>
            <td>{{ ent.phone }}</td>
            <td>{{ ent.address }}</td>
            <td>
              <md-standard-icon-button @click="onEdit(ent.id)">edit</md-standard-icon-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Establishment } from "~/types";
import { TYPE } from "vue-toastification";

import { ref, onMounted } from "vue";
import { useStore } from "~/store";
import { formatInviteKey } from "~/utils/string";

import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";

const store = useStore();
const establishments = ref<Establishment[]>([]);
const isLoading = ref(true);

onMounted(getEstablishments);

function onEdit(id: number | undefined) {
  if (id === undefined) {
    return;
  }
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
      });
    }

    establishments.value = estabs;
    isLoading.value = false;
  });
}
</script>