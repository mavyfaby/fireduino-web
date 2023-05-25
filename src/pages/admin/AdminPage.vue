<template>
  <div class="mt-5">
    <AdminTabs @change="onTabChange" :active="tab" />
    
    <div class="mt-5 overflow-y-visible">
      <transition name="slide-fade" mode="out-in">
        <EstablishmentTab v-if="tab == 1" />
        <FireDepartmentTab v-else-if="tab == 2" />
      </transition>
    </div>
    
    <AddEntityDialog />
    <LocationPickerDialog />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import AdminTabs from "./AdminTabs.vue";
import EstablishmentTab from "./tabs/EstablishmentTab.vue";
import FireDepartmentTab from "./tabs/FireDepartmentTab.vue";

import AddEntityDialog from "~/components/dialogs/AddEntityDialog.vue";
import LocationPickerDialog from "~/components/dialogs/LocationPickerDialog.vue";

const tab = ref(1);

/**
 * Change the active tab 
 */
function onTabChange(activetab: number) {
  tab.value = activetab;
}
</script>