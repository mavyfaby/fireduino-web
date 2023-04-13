<template>
  <div class="flex justify-center">
    <div class="tonal-card mt-16 w-full sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/3">
      <h3 class="title">Admin Login</h3>
      <div class="flex flex-col">
        <!-- Username -->
        <md-filled-text-field
          v-model="user"
          class="mt-4"
          label="Username"
          @keydown.enter="login"
          :disabled="isDisabled"
          placeholder="Enter username"
        >
          <md-icon slot="leadingicon">person</md-icon>
        </md-filled-text-field> 

        <!-- Password -->
        <md-filled-text-field
          v-model="pass"
          class="mt-4"
          type="password"
          @keydown.enter="login"
          label="Password"
          :disabled="isDisabled"
          placeholder="Enter password"
        >
          <md-icon slot="leadingicon">lock</md-icon>
        </md-filled-text-field>

        <!-- Login Button -->
        <div class="flex items-center justify-end">
          <md-filled-button @click="login" class="mt-8" :disabled="isDisabled" :label="loginLabel">
            <md-icon slot="icon" v-if="!isDisabled">login</md-icon>
          </md-filled-button>
        </div>
      </div>
    </div>  
  </div>
</template>

<script lang="ts" setup>
import "@material/web/textfield/filled-text-field";
import "@material/web/button/filled-button";
import "@material/web/icon/icon";

import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { TYPE } from "vue-toastification";

import showToast from "~/utils/toast";
import { useStore } from "~/store";
import { saveAuthToken } from "~/network/session";
import makeRequest, { Endpoints } from "~/network/request";

const user = ref("");
const pass = ref("");
const isDisabled = ref(false);
const loginLabel = ref("Login");
const counter = ref(2);

const store = useStore();
const router = useRouter();

onMounted(() => {
  // Check if user is already logged in
  if (store.isNotAuth) {
    showToast(TYPE.ERROR, "Please login to continue.");
  }
});

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
        loginLabel.value = `Try again in ${counter.value}...`;
        counter.value--;
        return;
      }

      clearInterval(interval);
      isDisabled.value = false;
      loginLabel.value = "Login";
      counter.value = 2;
    }, 1000);

    if (!error) {
      clearInterval(interval);
      isDisabled.value = true;
      loginLabel.value = "Login Successful";

      // Save login token
      saveAuthToken(response.data);
      // Set from logout to false
      store.isFromLogout = false;
      // Redirect to admin page
      router.push({ name: "Admin" }); // TODO: Make name a constant
    }
  });
}
</script>

<style scoped>
.title {
  @apply font-bold text-2xl mb-3 text-center;
}
</style>