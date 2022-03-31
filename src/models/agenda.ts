import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { Agenda, AgendaParams } from "../types/entities/agenda";

export const getAgendaList = (
  params?: string
): AxiosPromise<APIResponse<Agenda[]>> => {
  return coreAPI.get(`/agenda${params}`);
};

export const getAgendaById = (
  id: number
): AxiosPromise<APIResponse<Agenda>> => {
  return coreAPI.get(`/agenda/${id}`);
};

export const editAgenda = (
  id: number,
  params: AgendaParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.put(`/agenda/${id}`, params);
};

export const createAgenda = (
  params: AgendaParams
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post("/agenda", params);
};

export const deleteAgenda = (id: number): AxiosPromise<APIResponse<null>> => {
  return coreAPI.delete(`/agenda/${id}`);
};