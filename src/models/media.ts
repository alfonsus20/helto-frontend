import { coreAPI } from "../api";

import { AxiosPromise } from "axios";
import { APIResponse } from "../types/apiResponse";
import {
  GetMediaResponse,
  GetSingleMediaResponse,
  MediaParams,
} from "../types/entities/media";

export const getMediaList = (
  params?: string
): AxiosPromise<APIResponse<GetMediaResponse>> => {
  return coreAPI.get(`/media${params}`);
};

export const createMedia = (
  params: MediaParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post("/media", params);
};

export const editMedia = (
  id: number,
  params: MediaParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.put(`/media/${id}`, params);
};

export const getMediaById = (
  id: number
): AxiosPromise<APIResponse<GetSingleMediaResponse>> => {
  return coreAPI.get(`/media/${id}`);
};

export const deleteMedia = (id: number): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/media/${id}`);
};
