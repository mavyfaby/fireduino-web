import { defineStore } from "pinia";

const useStore = defineStore("global", () => {
  const dark = false;

  return {
    dark
  };
});

export {
  useStore
};