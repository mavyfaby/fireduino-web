<template>
  <md-dialog :open="store.dialog.addFireDepartments.open" @closed="onClose" scrimClickAction="">
    <div slot="header">Add Fire Department</div>

    <div class="grid items-center gap-5 py-2">
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
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <!-- Address -->
        <md-filled-text-field
          v-model.trim="address.text"
          :error="address.message.length > 0"
          :errorText="address.message"
          :maxLength="MAX_INPUTS.FIRE_DEPARTMENTS.ADDRESS"
          :disabled="isDisabled"
          label="Address
        ">
          <md-icon slot="leadingicon">location_city</md-icon>
        </md-filled-text-field>

        <!-- Latitude -->
        <md-filled-text-field
          v-model.trim="latitude.text"
          :error="latitude.message.length > 0"
          :errorText="latitude.message"
          :maxLength="MAX_INPUTS.FIRE_DEPARTMENTS.LATITUDE"
          :disabled="isDisabled"
          label="Latitude"
        >
          <md-icon slot="leadingicon">location_on</md-icon>
        </md-filled-text-field>

        <!-- Longitude -->
        <md-filled-text-field
          v-model.trim="longitude.text"
          :error="longitude.message.length > 0"
          :errorText="longitude.message"
          :maxLength="MAX_INPUTS.FIRE_DEPARTMENTS.LONGITUDE"
          :disabled="isDisabled"
          label="Longitude"
        >
          <md-icon slot="leadingicon">location_on</md-icon>
        </md-filled-text-field>
      </div>
    </div>

    <div class="flex space-x-3" slot="footer">
      <md-text-button v-if="isSuccess" label="Done" @click="onClose">
        <md-icon slot="icon">check</md-icon>
      </md-text-button>
      <div v-else>
        <md-text-button :disabled="isDisabled" label="Cancel" @click="onClose" />
        <md-text-button
          :disabled="isDisabled"
          :label="isDisabled ?  'Adding department...' : 'Add Department'"
          @click="addDepartment"
        />
      </div>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import "@material/web/button/text-button";
import "@material/web/textfield/filled-text-field";

import { ref } from "vue";
import { useStore } from "~/store";
import { MAX_INPUTS } from "~/env";
import { isTelPhone } from "~/utils/string";

import makeRequest, { Endpoints } from "~/network/request";
import showToast from "~/utils/toast";
import { TYPE } from "vue-toastification";

const store = useStore();

const name = ref({ text: "", message: "" });
const phone = ref({ text: "", message: "" });
const address = ref({ text: "", message: "" });
const latitude = ref({ text: "", message: "" });
const longitude = ref({ text: "", message: "" });
const isDisabled = ref(false);
const isSuccess = ref(false);

function onClose() {
  store.dialog.addFireDepartments.open = false;
  isDisabled.value = false;

  if (isSuccess.value) {
    name.value.text = "";
    phone.value.text = "";
    address.value.text = "";
    latitude.value.text = "";
    longitude.value.text = "";
  }
}

function addDepartment() {
  // Validate inputs
  if (!_validate()) return;

  isDisabled.value = true;

  // Send request
  makeRequest("POST", Endpoints.Department, {
    name: name.value.text,
    phone: phone.value.text,
    address: address.value.text,
    latitude: latitude.value.text,
    longitude: longitude.value.text,
  }, (err, response) => {
    // Show message
    showToast(err || !response.success ? TYPE.ERROR : TYPE.SUCCESS, response.message);
    
    if (err) {
      isDisabled.value = false;
      return;
    }
    
    // Reset inputs
    isSuccess.value = true;
  });
}

/**
 * Validate inputs
 */
function _validate() {
  // Reset messages
  name.value.message = "";
  phone.value.message = "";
  address.value.message = "";
  latitude.value.message = "";
  longitude.value.message = "";

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
  if (address.value.text.length === 0) {
    address.value.message = "Address is required";
    return false;
  }

  // TODO: Validate latitude and longitude if it's in range

  // Validate latitude
  if (latitude.value.text.length === 0) {
    latitude.value.message = "Latitude is required";
    return false;
  }

  if (isNaN(Number(latitude.value.text))) {
    latitude.value.message = "Latitude must be a number";
    return false;
  }

  // Validate longitude
  if (longitude.value.text.length === 0) {
    longitude.value.message = "Longitude is required";
    return false;
  }
  
  if (isNaN(Number(longitude.value.text))) {
    longitude.value.message = "Longitude must be a number";
    return false;
  }

  return true;
}
</script>