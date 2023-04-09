<template>
  <md-dialog :open="store.dialog.logout" @closed="onClose" scrimClickAction="">
    <div slot="header">Logout</div>

    Are you sure you want to logout?

    <div class="flex space-x-3" slot="footer">
      <md-text-button label="Cancel" @click="onClose" />
      <md-tonal-button label="Logout" @click="logout" />
    </div>
    
  </md-dialog>
</template>

<script lang="ts" setup>
import { revokeAuthToken } from "~/network/session";
import router from "~/router";
import { useStore } from "~/store";

const store = useStore();

function onClose() {
  store.dialog.logout = false;
}

function logout() {
  onClose();
  // Revoke token
  revokeAuthToken();
  // Set from logout to true
  store.isFromLogout = true;
  // Go to login
  router.replace({ name: "Login" });
}
</script>