/**
 * Set page title
 */
export function setTitle(title: string) {
  document.title = `${title === "Landing" ?  "" : title + " | " }Fireduino`;
}