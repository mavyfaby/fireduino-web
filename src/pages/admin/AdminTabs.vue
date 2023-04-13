<template>
  <div class="flex justify-center items-center">
    <div class="flex w-full md:w-1/2">
      <md-navigation-tab label="Dashboard" @click="onTabClick(0)" :active="active == 0">
        <md-icon slot="activeIcon" filled>dashboard</md-icon>
        <md-icon slot="inactiveIcon">dashboard</md-icon>
      </md-navigation-tab>
      <md-navigation-tab label="Establishments" @click="onTabClick(1)" :active="active == 1">
        <md-icon slot="activeIcon" filled>location_city</md-icon>
        <md-icon slot="inactiveIcon">location_city</md-icon>
      </md-navigation-tab>
      <md-navigation-tab label="Fire Departments" @click="onTabClick(2)" :active="active == 2">
        <md-icon slot="activeIcon" filled>cloud</md-icon>
        <md-icon slot="inactiveIcon">cloud</md-icon>
      </md-navigation-tab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/navigationbar/navigation-bar";
import "@material/web/navigationtab/navigation-tab";

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
