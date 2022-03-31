import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { GetNewsResponse } from "../types/entities/news";

export const getNewsList = (
  params?: string
): AxiosPromise<APIResponse<GetNewsResponse>> => {
  return coreAPI.get(`/news?${params}`);
};
