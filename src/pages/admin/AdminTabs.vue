<template>
  <div class="flex justify-center items-center">
    <div class="flex w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
      <VTabs @change="onTabClick" :active="active" :tabs="tabs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import VTabs from '~/components/tabs/VTabs.vue';
import type { Tab } from '~/types';

// Define props
defineProps({
  active: {
    type: Number,
    default: 1,
  }
});

// Define emits
const emit = defineEmits(["change"]);

// Tabs
const tabs: Tab[] = [
  { id: 1, label: "Establishments", icon: "location_city" },
  { id: 2, label: "Fire Departments", icon: "cloud" }
];

/**
 * Change the active tab
 */
function onTabClick(tab: number) {
  emit("change", tab);
}
</script>
