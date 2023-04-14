import { defineStore } from "pinia";

type DialogAction = { name: string, action: Function };
type DialogInfo = { title : string, content: string, actions: DialogAction[] };

const useStore = defineStore("global", () => {
  const dark: boolean = false;
  const isNotAuth: boolean = false;
  const isFromLogout: boolean = false;

  const dialog = {
    logout: {
      isOpen: false
    },
    main: {
      isOpen: false,
      title: "",
      content: "",
      actions: [] as DialogAction[], 
      open(data: DialogInfo) {
        this.title = data.title;
        this.content = data.content;
        this.actions = data.actions;
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
    addFireDepartments: {
      isOpen: false,
      name: "",
      phone: "",
      address: "",
      latitude: "",
      longitude: ""
    },
  };

  return {
    dark, isNotAuth, isFromLogout, dialog
  };
});

export {
  useStore
};