/**
 * Set key-value pair to localstorage 
 * @param {string} key Key store
 * @param {any} value Value store
 */
export function setStore(key, value) {
  localStorage.setItem(key, value);
}

/**
 * Get value from localstorage
 * @param {string} key Key store
 */
export function getStore(key) {
  return localStorage.getItem(key);
}