<template>
  <div class="flex justify-center">
    <div class="card w-full lg:w-1/2 xl:w-1/3">
      <h3 class="title">Admin Login</h3>
      <div class="flex flex-col">
        <md-outlined-text-field class="mt-4" label="Username" placeholder="Enter username">
          <md-icon slot="leadingicon">
            <UserIcon />
          </md-icon>
        </md-outlined-text-field>
        <md-outlined-text-field class="mt-4" type="password" label="Password" placeholder="Enter password">
          <md-icon slot="leadingicon">
            <LockIcon />
          </md-icon>
        </md-outlined-text-field>
        <div class="flex">
          <md-filled-button class="mt-8 w-full" label="Login" />
        </div>
      </div>
    </div>  
  </div>
</template>

<script setup>
import "@material/web/textfield/outlined-text-field";
import "@material/web/button/filled-button";
import "@material/web/icon/icon";

import UserIcon from "@mdi/svg/svg/account-outline.svg?component";
import LockIcon from "@mdi/svg/svg/lock-outline.svg?component";
</script>

<style scoped>
.title {
  @apply font-bold text-2xl mb-8;
}

.card {
  @apply flex flex-col items-center justify-center mt-16 bg-surface-variant rounded-[32px] p-12;
}
</style>asdd