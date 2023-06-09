<template>
  <md-dialog :open="store.dialog.map.isOpen" @closed="onClose" scrimClickAction="">
    <div slot="header">Select location</div>

    <div id="fireduino-map" />

    <div class="flex space-x-3" slot="footer">
      <md-text-button @click="onClose">
        Cancel
      </md-text-button>
      <md-text-button @click="select">
        Select
      </md-text-button>
    </div>
  </md-dialog>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import { useStore } from "~/store";
import { Loader } from '@googlemaps/js-api-loader';
import { MAP_CENTER } from "~/env";
import makeRequest, { Endpoints } from "~/network/request";

const store = useStore();
const address = ref("");

let marker: google.maps.Marker;
let map: google.maps.Map;

const mapOptions = {
  center: {
    lat: MAP_CENTER.LATITUDE,
    lng: MAP_CENTER.LONGITUDE
  },
  zoom: 12
};

watch(() => store.dialog.map.isOpen, (isOpen) => {
  if (isOpen && store.dialog.entity.isOpen) {
    const latLng = new google.maps.LatLng(parseFloat(store.dialog.map.latitude), parseFloat(store.dialog.map.longitude));
    marker = createMarker(map, latLng);
  }
});

onMounted(() => {
  // Check if api keys are loaded, if not
  if (!store.config.mapsApi || !store.config.reverseGeocodingApi) {
    // Load api keys
    makeRequest("GET", Endpoints.Config, null, (error, response) => {
      store.config = response.message;
      initializeMap();
    });

    return;
  }

  initializeMap();  
});

/**
 * Initialize Google Maps
 */
function initializeMap() {
  const loader = new Loader({
    apiKey: store.config.mapsApi,
    version: "weekly",
    libraries: ["places"]
  });

  // Load Google Maps
  loader.load().then((google) => {
    // Initialize map
    map = new google.maps.Map(document.getElementById("fireduino-map")!, mapOptions);
  
    // Add on map click listener
    google.maps.event.addListener(map, "click", (event: any) => {
      // Remove previous marker
      if (marker) {
        marker.setMap(null);
      }
      
      // Add marker on click
      marker = createMarker(map, event.latLng);

      /**
       * Perform Reverse Geocoding
       */
      axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${event.latLng.lat()}&lon=${event.latLng.lng()}&apiKey=${store.config.reverseGeocodingApi}`)
        .then(response => {
          address.value = response.data.features[0].properties.formatted;
        });
    });
  });
}

function createMarker(map: google.maps.Map, latLng: google.maps.LatLng) {
  return new google.maps.Marker({
    position: latLng,
    map: map
  });
}


function onClose() {
  store.dialog.map.isOpen = false;
  
  if (marker) {
    marker.setMap(null);
  }
}

function select() {
  if (!marker) {
    return;
  }

  const { lng, lat } = marker.getPosition()!;

  store.dialog.map.address = address.value;
  store.dialog.map.longitude = lng().toString();
  store.dialog.map.latitude = lat().toString();

  onClose();

}
</script>