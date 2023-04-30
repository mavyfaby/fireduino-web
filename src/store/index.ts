import type {  Config, Establishment, FireDepartment } from "~/types";
import { defineStore } from "pinia";

type DialogParam = { title : string, content: string, actions: EntityAction[] };
type EntityAction = { name: string, action: Function };
type EntityActionAccept = { name: string, action: (entity: Establishment | FireDepartment, callback: (success: boolean) => void) => void };
type EntityParam = { title: string, entity: "establishment" | "department", dept?: FireDepartment, estb?: Establishment, acceptAction: EntityActionAccept };

/**
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark: boolean = false;
  const isNotAuth: boolean = false;
  const isFromLogout: boolean = false;
  const config: Config = {
    mapsApi: "",
    reverseGeocodingApi: ""
  };

  const dialog = {
    logout: {
      isOpen: false
    },
    session: {
      isOpen: false
    },
    map: {
      isOpen: false,
      address: "",
      latitude: "",
      longitude: ""
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
      entity: "" as "establishment" | "department",
      dept: {} as FireDepartment,
      estb: {} as Establishment,
      acceptAction: {} as EntityActionAccept,
      open(data: EntityParam) {
        this.title = data.title;
        this.entity = data.entity;
        this.dept = data.dept!;
        this.estb = data.estb!;
        this.acceptAction = data.acceptAction;
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
  };

  return {
    dark, isNotAuth, isFromLogout, dialog, config
  };
});

export {
  useStore
};