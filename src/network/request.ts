import type { HttpMethod } from "~/types";
import type { AxiosRequestConfig } from "axios";
import { TYPE } from "vue-toastification";
import { Endpoints } from "./endpoints";

import axios from "axios";
import showToast from "~/utils/toast";

// Create a new axios instance
const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://fireduino.azurewebsites.net" : "http://127.0.0.1:4000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});

/**
 * Make a request to the Fireduino API
 */
function makeRequest(method: HttpMethod, endpoint: Endpoints, data: object | null, callback: (error: boolean, response: any) => void) {
  // Create config 
  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
  };

  // If data is not null
  if (data !== null) {
    // Add data to config
    config.data = data;
  }

  // Execute request
  instance(config).then((response) => {
    // If not success
    if (!response.data.success) {
      // Show error toast
      showToast(TYPE.ERROR, response.data.message);
    }

    callback(!response.data.success, response.data);
  })
  .catch((error) => {
    // If has custom message
    if (error.response?.data.message) {
      error.message = error.response.data.message;
    }

    // Show error toast
    showToast(TYPE.ERROR, error.message);

    // Execute callback
    callback(true, error);
  });
}

export { Endpoints };
export default makeRequest;