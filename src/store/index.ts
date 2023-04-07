import { defineStore } from "pinia";

const useStore = defineStore("global", () => {
  const dark: boolean = false;

  return {
    dark
  };
});

export {
  useStore
};