import { defineStore } from "pinia";

const useStore = defineStore("global", () => {
  const dark: boolean = false;
  const isNotAuth: boolean = false;
  const isFromLogout: boolean = false;

  const dialog = {
    logout: {
      open: false
    },
    addFireDepartments: {
      open: false,
      name: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: "",
    }
  };

  return {
    dark, isNotAuth, isFromLogout, dialog
  };
});

export {
  useStore
};