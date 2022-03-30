import { AxiosPromise } from "axios";
import { locationAPI } from "../api";
import { APICityResponse, APIProvinceResponse } from "../types/apiResponse";

export const getProvinces = (): AxiosPromise<APIProvinceResponse> => {
  return locationAPI.get("/provinsi");
};

export const getCities = (
  idProvince: string
): AxiosPromise<APICityResponse> => {
  return locationAPI.get(`/kota?id_provinsi=${idProvince}`);
};
