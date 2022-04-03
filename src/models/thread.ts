import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import {
  JoinConsultationResponse,
  Thread,
  ThreadDetail,
  ThreadNewParams,
  ThreadReplyParams,
} from "../types/entities/thread";

export const getAllCommunityThreads = (
  params?: string
): AxiosPromise<APIResponse<{ posts: Array<Thread> }>> => {
  return coreAPI.get(`/post/community?${params}`);
};

export const getAllPrivateThreads = (
  key: string,
  params?: string
): AxiosPromise<APIResponse<{ posts: Array<Thread> }>> => {
  return coreAPI.get(`/post/${key}?${params}`);
};

export const getCommunityThreadById = (
  id: number
): AxiosPromise<APIResponse<ThreadDetail>> => {
  return coreAPI.get(`/post/community/${id}`);
};

export const replyToThreadCommunity = (
  params: ThreadReplyParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post(`/post/community`, params);
};

export const postNewThreadCommunity = (
  params: ThreadNewParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post(`/post/community`, params);
};

export const postNewPrivateThreadCommunity = (
  key: string,
  params: ThreadNewParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post(`/post/${key}`, params);
};

export const likeThreadCommunity = (
  id: number
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post(`/post/community/${id}/like`);
};

export const claimKey = (): AxiosPromise<APIResponse<string>> => {
  return coreAPI.get("/thread/key");
};

export const joinConsultation = (
  params: string
): AxiosPromise<APIResponse<JoinConsultationResponse>> => {
  return coreAPI.get(`/thread/enrollment/${params}`);
};
