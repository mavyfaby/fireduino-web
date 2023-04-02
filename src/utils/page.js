/**
 * Set page title
 * @param {string} title Page title
 */
export function setTitle(title) {
  document.title = `${title.length > 0 ? title + " | " : "" }Fireduino`;
}