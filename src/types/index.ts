import { Endpoints as e } from "~/network/endpoints";

export type FireDepartment = {
  id?: number;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type Endpoints = e