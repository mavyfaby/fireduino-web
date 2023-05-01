<template>
  <md-dialog :open="store.dialog.entity.isOpen" @closed="onClose" scrimClickAction="">
    <div slot="header">{{ store.dialog.entity.title }}</div>

    <div class="grid items-center gap-5 py-2">
      <div class="grid grid-cols-2 gap-5">
        <!-- Name -->
        <md-filled-text-field
          v-model.trim="name.text"
          :error="name.message.length > 0"
          :errorText="name.message"
          class="w-full"
          :disabled="isDisabled"
          :maxLength="MAX_INPUTS.FIRE_DEPARTMENTS.NAME"
          label="Name"
        >
          <md-icon slot="leadingicon">location_city</md-icon>
        </md-filled-text-field>
        
        <!-- Phone Number -->
        <md-filled-text-field
          type="tel"
          v-model.trim="phone.text"
          :error="phone.message.length > 0"
          :errorText="phone.message"
          :disabled="isDisabled"
          :maxLength="MAX_INPUTS.FIRE_DEPARTMENTS.PHONE"
          label="Phone"
        >
          <md-icon slot="leadingicon">phone</md-icon>
        </md-filled-text-field>
      </div>

      <!-- Establishment Invite Key -->
      <div v-if="store.dialog.entity.entity === 'establishment'" class="flex space-x-4 items-center">
        <md-filled-text-field
          :value="formatInviteKey(inviteKey.text)"
          :error="inviteKey.message.length > 0"
          :errorText="inviteKey.message"
          supportingText="Use this key to signup for your establishment in the mobile app. "
          class="w-full"
          label="Invite Key"
          :disabled="isDisabled"
          readOnly
        >
          <md-icon slot="leadingicon">vpn_key</md-icon>
        </md-filled-text-field>

        <md-text-button
          :disabled="isGeneratingKey || isCoolingDown || isDisabled || store.dialog.entity.title.startsWith('Edit')"
          @click="generateInviteKey"
          class="mb-3"
        >
          {{ isCoolingDown ? coolDown :  isGeneratingKey ? 'Generating...' : 'Generate' }}
        </md-text-button>
      </div>

      <!-- Location -->
      <div class="grid gap-5"> 
        <div class="flex justify-between items-center">
          <span class="font-bold text-base">Location</span>
          <!-- Select location button -->
          <md-filled-button @click="store.dialog.map.isOpen = true">
            <md-icon slot="icon">location_on</md-icon> Select location
          </md-filled-button>
        </div>
  
        <!-- Address -->
        <md-filled-text-field
          readonly disabled
          :value="store.dialog.map.address"
          :error="addressMessage.length > 0"
          :errorText="addressMessage"
          label="Address"
        >
          <md-icon slot="leadingicon">location_city</md-icon>
        </md-filled-text-field>
        
        <div class="grid grid-cols-2 gap-5">
          <!-- Latitude -->
          <md-filled-text-field
            readonly  disabled
            :value="store.dialog.map.latitude"
            :error="latitudeMessage.length > 0"
            :errorText="latitudeMessage"
            label="Latitude"
          >
            <md-icon slot="leadingicon">location_on</md-icon>
          </md-filled-text-field>
    
          <!-- Longitude -->
          <md-filled-text-field
            readonly disabled
            :value="store.dialog.map.longitude"
            :error="longitudeMessage.length > 0"
            :errorText="longitudeMessage"
            label="Longitude"
          >
            <md-icon slot="leadingicon">location_on</md-icon>
          </md-filled-text-field>
        </div>
      </div>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button v-if="isSuccess" @click="onClose">
        <md-icon slot="icon">check</md-icon> Done
      </md-text-button>
      <div class="flex space-x-2" v-else>
        <md-text-button :disabled="isDisabled" @click="onClose">
          Cancel
        </md-text-button>
        <md-text-button :disabled="isDisabled" @click="addEntity">
          {{ isDisabled ? (store.dialog.entity.title.startsWith("Edit") ? 'Editing ' : 'Adding ') + (store.dialog.entity.entity === 'department' ? 'department...' : 'Establishment...') : store.dialog.entity.acceptAction.name }}
        </md-text-button>
      </div>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useStore } from "~/store";
import { MAX_INPUTS } from "~/env";
import { isTelPhone, formatInviteKey  } from "~/utils/string";
import makeRequest, { Endpoints } from "~/network/request";
import { Establishment, FireDepartment } from "~/types";

const store = useStore();

const id = ref(-1);
const name = ref({ text: "", message: "" });
const phone = ref({ text: "", message: "" });
const inviteKey = ref({ text: "", message: "" });
const isDisabled = ref(false);
const isSuccess = ref(false);
const isGeneratingKey = ref(false);
const isCoolingDown = ref(false);
const addressMessage = ref("");
const latitudeMessage = ref("");
const longitudeMessage = ref("");
const coolDown = ref(0);

watch(() => store.dialog.entity.isOpen, (isOpen) => {
  const entity = store.dialog.entity;

  if (isOpen) {
    let data: FireDepartment | Establishment | null = null;

    if (entity.entity === "department" && entity.dept) {
      data = entity.dept;
    }

    if (entity.entity === "establishment" && entity.estb) {
      data = entity.estb;
    }

    if (data !== null) {
      id.value = data.id!;
      name.value.text = data.name;
      phone.value.text = data.phone;
      store.dialog.map.address = data.address;
      store.dialog.map.latitude = data.latitude;
      store.dialog.map.longitude = data.longitude;

      if ("invite_key" in data) {
        inviteKey.value.text = data.invite_key;
      }
    }
  }
})

function onClose() {
  store.dialog.entity.isOpen = false;
  isDisabled.value = false;
  isGeneratingKey.value = false;
  inviteKey.value.text = "";

  if (isSuccess.value) {
    id.value = -1;
    name.value.text = "";
    phone.value.text = "";
  }

  isSuccess.value = false;
  store.dialog.map.address = "";
  store.dialog.map.latitude = "";
  store.dialog.map.longitude = "";
}

/**
 * Add entity (Fire Department | Establishment)
 */
function addEntity() {
  // Validate inputs
  if (!_validate()) return;
  // Disable all inputs
  isDisabled.value = true;
  
  // Fire department data
  const fr_data: FireDepartment = {
    id: id.value,
    name: name.value.text,
    phone: phone.value.text,
    address: store.dialog.map.address,
    latitude: store.dialog.map.latitude,
    longitude: store.dialog.map.longitude,  
  };

  // Establishment data
  const es_data: Establishment = {
    ...fr_data,
    invite_key: inviteKey.value.text,
  };

  // Trigger action
  store.dialog.entity.acceptAction.action(
    store.dialog.entity.entity === "department" ? fr_data : es_data,
    (success) => {
      if (!success) {
        isDisabled.value = false;
        return;
      }

      isSuccess.value = true;
    }
  );
}

function generateInviteKey() {
  let interval: NodeJS.Timer;
  isGeneratingKey.value = true;

  makeRequest("GET", Endpoints.InviteKey, null, (error, response) => {
    if (error) {
      isGeneratingKey.value = false;
      return;
    }

    inviteKey.value.text = response.message;
    inviteKey.value.message = "";
    isGeneratingKey.value = false;
    isCoolingDown.value = true;
    coolDown.value = 5;

    interval = setInterval(() => {
      coolDown.value -= 1;

      if (coolDown.value === 0) {
        isCoolingDown.value = false;
        clearInterval(interval);
      }
    }, 1000);
  });
}

/**
 * Validate inputs
 */
function _validate() {
  // Reset messages
  name.value.message = "";
  phone.value.message = "";

  // Validate name
  if (name.value.text.length === 0) {
    name.value.message = "Name is required";
    return false;
  }

  // Validate phone
  if (phone.value.text.length === 0) {
    phone.value.message = "Phone is required";
    return false;
  }

  if (!isTelPhone(phone.value.text)) {
    phone.value.message = "Must be a valid telephone number";
    return false;
  }
  
  // Validate address
  if (store.dialog.map.address.length === 0) {
    addressMessage.value = "Address is required";
    return false;
  }

  // Validate latitude
  if (store.dialog.map.latitude.length === 0) {
    longitudeMessage.value = "Latitude is required";
    return false;
  }

  // Validate longitude
  if (store.dialog.map.longitude.length === 0) {
    longitudeMessage.value = "Longitude is required";
    return false;
  }

  // Establishment validation
  if (store.dialog.entity.entity === "establishment") {
    // Check for invite key
    if (inviteKey.value.text.length === 0) {
      inviteKey.value.message = "Invite key is required";
      return false;
    }

    return true;
  }

  return true;
}
</script>
