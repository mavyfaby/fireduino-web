import { getStore, setStore, removeStore } from "~/utils/storage";
import makeRequest, { Endpoints } from "./request";

/**
 * Save auth token in base64 format
 */
export function saveAuthToken(token: string) {
  setStore('token', token);
}

/**
 * Get auth token 
 */
export function getAuthToken() {
  // Get token
  let token = getStore('token');
  // If token is not defined, return null
  if (token === null) return null;
  // Otherwise, return token
  return token;
}

/**
 * If has auth token
 */
export function hasLoginToken() {
  return getAuthToken() !== null;
}

/**
 * Revoke auth token
 */
export function revokeAuthToken() {
  removeStore('token');
}

/**
 * Validate token
 */
export async function validateToken() {
  return new Promise((resolve) => {
    // Get token
    const token = getAuthToken();
    // If token is not defined, return false
    if (token === null) return resolve(false);
  
    makeRequest("POST", Endpoints.Validate, { token }, (err, data) => {
      resolve(!err && data.success);
    });
  });
}