<template>
  <div class="tonal-card">
    <md-linear-progress v-if="loading" indeterminate />
    <div class="inner">
      <slot />
    </div>
  </div>  
</template>

<script lang="ts" setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.tonal-card {
  @apply flex flex-col bg-inverse-on-surface text-on-surface rounded-[32px] overflow-hidden relative;

  > .inner {
    @apply p-9;
  }
}

md-linear-progress {
  @apply absolute top-0 left-0 right-0;
}
</style>