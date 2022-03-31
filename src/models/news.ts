import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { GetNewsResponse, NewsSingle } from "../types/entities/news";

export const getNewsList = (
  params?: string
): AxiosPromise<APIResponse<GetNewsResponse>> => {
  return coreAPI.get(`/news${params}`);
};

export const createNews = (
  params: FormData
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post("/news", params);
};

export const getNewsById = (
  id: number
): AxiosPromise<APIResponse<NewsSingle>> => {
  return coreAPI.get(`/news/${id}`);
};

export const deleteNews = (id: number): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/news/${id}`);
};
