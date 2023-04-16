import { Endpoints as e } from "~/network/endpoints";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type Endpoints = e

export type Config = {
  mapsApi: string;
  reverseGeocodingApi: string;
};

export type FireDepartment = {
  id?: number;
  name: string;
  phone: string;
  address: string;
  latitude: string;
  longitude: string;
}

export type Establishment = {
  id?: number;
  name: string;
  phone: string;
  address: string;
  invite_key: string;
}
