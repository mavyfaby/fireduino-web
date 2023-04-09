<template>
  <div class="flex">
    <md-navigation-tab label="Dashboard" @click="onTabClick(0)" :active="active == 0">
      <md-icon slot="activeIcon">
        <DashboardIcon />
      </md-icon>
      <md-icon slot="inactiveIcon">
        <DashboardOutlineIcon />
      </md-icon>
    </md-navigation-tab>
    <md-navigation-tab label="Establishments" @click="onTabClick(1)" :active="active == 1">
      <md-icon slot="activeIcon">
        <OfficeBuildingIcon />
      </md-icon>
      <md-icon slot="inactiveIcon">
        <OfficeBuildingOutlineIcon />
      </md-icon>
    </md-navigation-tab>
    <md-navigation-tab label="Fire Departments" @click="onTabClick(2)" :active="active == 2">
      <md-icon slot="activeIcon">
        <CloudIcon />
      </md-icon>
      <md-icon slot="inactiveIcon">
        <CloudOutlineIcon />
      </md-icon>
    </md-navigation-tab>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/navigationbar/navigation-bar";
import "@material/web/navigationtab/navigation-tab";

import DashboardIcon from "@mdi/svg/svg/view-dashboard.svg?component";
import DashboardOutlineIcon from "@mdi/svg/svg/view-dashboard-outline.svg?component";

import OfficeBuildingIcon from "@mdi/svg/svg/office-building.svg?component";
import OfficeBuildingOutlineIcon from "@mdi/svg/svg/office-building-outline.svg?component";

import CloudIcon from "@mdi/svg/svg/cloud.svg?component";
import CloudOutlineIcon from "@mdi/svg/svg/cloud-outline.svg?component";

// Define props
defineProps({
  active: {
    type: Number,
    default: 0,
  }
});

// Define emits
const emit = defineEmits(["change"]);

/**
 * Change the active tab
 */
function onTabClick(tab: number) {
  emit("change", tab);
}
</script>