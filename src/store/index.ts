import type {  Establishment, FireDepartment } from "~/types";
import { defineStore } from "pinia";

type DialogParam = { title : string, content: string, actions: EntityAction[] };
type EntityAction = { name: string, action: Function };
type EntityActionAccept = { name: string, action: (entity: Establishment | FireDepartment, callback: (success: boolean) => void) => void };
type EntityParam = { title: string, entity: "establishment" | "department", acceptAction: EntityActionAccept };

/**
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark: boolean = false;
  const isNotAuth: boolean = false;
  const isFromLogout: boolean = false;

  const dialog = {
    logout: {
      isOpen: false
    },
    session: {
      isOpen: false
    },
    main: {
      isOpen: false,
      title: "",
      content: "",
      actions: [] as EntityAction[], 
      open(data: DialogParam) {
        this.title = data.title;
        this.content = data.content;
        this.actions = data.actions;
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
    entity: {
      isOpen: false,
      title: "",
      entity: "",
      acceptAction: {} as EntityActionAccept,
      open(data: EntityParam) {
        this.title = data.title;
        this.entity = data.entity;
        this.acceptAction = data.acceptAction;
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
  };

  return {
    dark, isNotAuth, isFromLogout, dialog
  };
});

export {
  useStore
};