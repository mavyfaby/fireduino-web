/**
 * Set page title
 */
export function setTitle(title: string) {
  document.title = `${title.length > 0 ? title + " | " : "" }Fireduino`;
}