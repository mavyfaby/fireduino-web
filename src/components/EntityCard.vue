<template>
  <div class="entity-card">
    <div class="header">
      <h3>{{ name }}</h3>
      <md-standard-icon-button @click="edit">Edit</md-standard-icon-button>
    </div>
    <div class="details">
      <div>
        <md-icon>location_on</md-icon>
        <p class="address">{{ address }}</p>
      </div>
      <div>
        <md-icon>phone</md-icon>
        <p class="phone">{{ phone }}</p>
      </div>
      <div v-if="type === 1">
        <md-icon>lock</md-icon>
        <p class="key">{{ inviteKey }}</p>
      </div>
      <div v-if="type === 2">
        <md-icon>my_location</md-icon>
        <p class="pos">{{ fixed(latitude) }} - {{ fixed(longitude) }}</p>
      </div>
      <div>
        <md-icon>calendar_today</md-icon>
        <div class="date">{{ formatDate(dateStamp) }}</div>
      </div>
    </div>
  </div>  
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  inviteKey: {
    type: String,
    default: ""
  },
  latitude: {
    type: String,
    default: ""
  },
  longitude: {
    type: String,
    default: ""
  },
  dateStamp: {
    type: String,
    default: ""
  }
})

function edit() {
  console.log("EDit");
}

/**
 * Formats a date
 */
function formatDate(date: string) {
  return new Date(date).toDateString();
}

/**
 * Fixes a number to a certain length
 */
function fixed(strnum: string, len: number = 3) {
  return Number(strnum).toFixed(len);
}
</script>

<style lang="scss" scoped>
.entity-card {
  @apply h-full grid py-5 px-7 rounded-xl bg-surface-variant text-on-surface-variant
    shadow-md dark:shadow-none shadow-neutral-300;

  &:hover {
    .header md-standard-icon-button {
      @apply visible;
    }
  }

  h3 {
    @apply text-xl font-bold;
  }

  .header {
    @apply flex justify-between items-center mb-2;

    md-standard-icon-button {
      @apply invisible;
    }
  }

  p {
    @apply font-medium;
  }

  md-icon {
    @apply flex text-primary items-center text-xl pt-0.5 opacity-75;
  }

  .details > div {
    @apply flex items-center gap-4;
  }
}
</style>