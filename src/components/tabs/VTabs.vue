<template>
  <div class="tabs">
    <div
      class="tab"
      v-for="tab in tabs"
      :key="tab.id"
      @click="emit('change', tab.id)"
      @keyup="onKeyUp($event, tab.id)"
      role="button"
      tabindex="0"
    >
      <md-icon v-if="tab.id === active" filled>{{ tab.icon }}</md-icon>
      <md-icon v-else>{{ tab.icon }}</md-icon>
      <p :class="{ 'active': tab.id === active }">{{ tab.label }}</p>
      <div class="indicator" v-if="tab.id === active" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import type { Tab } from '~/types';

defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    required: true
  },
  active: {
    type: Number,
    required: true
  }
})

function onKeyUp(ev: KeyboardEvent, tab: number) {
  if (ev.key === 'Enter') {
    emit('change', tab);
  }
}

// Define emits
const emit = defineEmits(['change']);
</script>

<style lang="scss" scoped>
.tabs {
  @apply flex justify-around w-full relative py-3;
}

.indicator {
  @apply bg-primary absolute bottom-0 w-[32px] rounded-tl-[3px] rounded-tr-[3px] h-[3px];
}

.tab {
  @apply flex flex-col justify-center items-center;

  p {
    @apply text-on-surface-variant text-sm mt-1 font-medium;
  }

  p.active {
    @apply text-primary;
  }
}

md-icon {
  @apply text-on-surface-variant;
}

md-icon[active="true"] {
  @apply text-primary;
}
</style>