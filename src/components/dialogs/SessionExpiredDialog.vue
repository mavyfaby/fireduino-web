<template>
  <md-dialog :open="store.dialog.session.isOpen" scrimClickAction="">
    <div slot="header">Session expired</div>

    Please login again.

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="login">
        Login
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { revokeAuthToken } from "~/network/session";
import { useStore } from "~/store";
import router from "~/router";

const store = useStore();

function login() {
  // Close dialog
  store.dialog.session.isOpen = false;
  // Revoke token
  revokeAuthToken();
  // Set from logout to true
  store.isFromLogout = true;
  // Go to login
  router.replace({ name: "Login" });
}
</script>