<template>
  <div class="mt-5">
    <AdminTabs @change="onTabChange" :active="tab" />
    
    <div class="mt-5 overflow-y-visible">
      <transition name="slide-fade" mode="out-in">
        <DashboardTab v-if="tab == 0" />
        <EstablishmentTab v-else-if="tab == 1" />
        <FireDepartmentTab v-else-if="tab == 2" />
      </transition>
    </div>
    
    <AddDepartmentDialog />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import AdminTabs from "./AdminTabs.vue";
import DashboardTab from "./tabs/DashboardTab.vue";
import EstablishmentTab from "./tabs/EstablishmentTab.vue";
import FireDepartmentTab from "./tabs/FireDepartmentTab.vue";

import AddDepartmentDialog from "~/components/dialogs/AddDepartmentDialog.vue";

const tab = ref(0);

/**
 * Change the active tab 
 */
function onTabChange(activetab: number) {
  tab.value = activetab;
}
</script>