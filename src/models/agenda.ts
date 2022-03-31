import { AxiosPromise } from "axios";
import { coreAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { Agenda } from "../types/entities/agenda";

export const getAgendaList = (
  params?: string
): AxiosPromise<APIResponse<Agenda[]>> => {
  return coreAPI.get(`/agenda?${params}`);
};
