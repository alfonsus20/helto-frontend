import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import {
  GetNewsResponse,
  GetSingleNewsResponse,
  NewsSingle,
} from "../types/entities/news";

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
): AxiosPromise<APIResponse<GetSingleNewsResponse>> => {
  return coreAPI.get(`/news/${id}`);
};

export const editNews = (
  id: number,
  params: FormData
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.put(`/news/${id}`, params);
};

export const deleteNews = (id: number): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/news/${id}`);
};
