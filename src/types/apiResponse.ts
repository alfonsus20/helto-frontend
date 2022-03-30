import { City, Province } from "./entities/location";

export type SuccessResponse<TData> = {
  code: string;
  message: string;
  data: TData;
};

export type SuccessProvinceResponse = {
  message: string;
  provinsi: Province[];
};

export type SuccessCityResponse = {
  message: string;
  kota_kabupaten: City[];
};

export type ErrorResponse = {
  code: string;
  message: string;
  data: null;
};

export type APIProvinceResponse = SuccessProvinceResponse;
export type APICityResponse = SuccessCityResponse;

export type APIResponse<TData> = SuccessResponse<TData> | ErrorResponse;
