import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { GetMediaResponse } from "../types/entities/media";

export const getMediaList = (
  params?: string
): AxiosPromise<APIResponse<GetMediaResponse>> => {
  return coreAPI.get(`/media${params}`);
};

export const deleteMedia = (id: number): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/media/${id}`);
};
