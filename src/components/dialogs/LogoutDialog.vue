<template>
  <md-dialog :open="store.dialog.logout.isOpen" @closed="onClose" scrimClickAction="">
    <div slot="header">Logout</div>

    Are you sure you want to logout?

    <div class="flex space-x-3" slot="footer">
      <md-text-button label="Cancel" @click="onClose" />
      <md-text-button label="Logout" @click="logout" />
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { revokeAuthToken } from "~/network/session";
import { useStore } from "~/store";

const store = useStore();
const router = useRouter();

function onClose() {
  store.dialog.logout.isOpen = false;
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