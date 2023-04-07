<template>
  <div class="flex justify-center">
    <div class="tonal-card w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3">
      <h3 class="title">Admin Login</h3>
      <div class="flex flex-col">
        <!-- Username -->
        <md-filled-text-field
          v-model="user"
          class="mt-4"
          label="Username"
          @keydown.enter="login"
          placeholder="Enter username"
        >
          <md-icon slot="leadingicon">
            <UserIcon />
          </md-icon>
        </md-filled-text-field>

        <!-- Password -->
        <md-filled-text-field
          v-model="pass"
          class="mt-4"
          type="password"
          @keydown.enter="login"
          label="Password"
          placeholder="Enter password"
        >
          <md-icon slot="leadingicon">
            <LockIcon />
          </md-icon>
        </md-filled-text-field>

        <!-- Login Button -->
        <div class="flex items-center justify-end">
          <md-filled-button @click="login" class="mt-8" :disabled="isDisabled" :label="loginLabel" />
        </div>
      </div>
    </div>  
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/filled-text-field";
import "@material/web/button/filled-button";
import "@material/web/icon/icon";

import UserIcon from "@mdi/svg/svg/account-outline.svg?component";
import LockIcon from "@mdi/svg/svg/lock-outline.svg?component";

import { ref } from "vue";
import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";
import { TYPE } from "vue-toastification";

const user = ref("");
const pass = ref("");
const isDisabled = ref(false);
const loginLabel = ref("Login");
const counter = ref(2);

let interval: NodeJS.Timer;

function login() {
  if (isDisabled.value) return;

  isDisabled.value = true;
  loginLabel.value = `Checking credentials...`;

  const data = {
    user: user.value,
    pass: pass.value
  };

  makeRequest("POST", Endpoints.Login, data, (error, response) => {
    interval = setInterval(() => {
      if (counter.value > 0) {
        loginLabel.value = `Login again in ${counter.value}...`;
        counter.value--;
        return;
      }

      clearInterval(interval);
      isDisabled.value = false;
      loginLabel.value = "Login";
      counter.value = 2;
    }, 1000);

    if (!error) {
      showToast(TYPE.SUCCESS, response.message);
    }
  });
}
</script>

<style scoped>
.title {
  @apply font-bold text-2xl mb-3 text-center;
}
</style>