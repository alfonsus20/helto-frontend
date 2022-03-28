import { AxiosPromise } from "axios";

export type SuccessResponse<TData> = {
  code: string;
  message: string;
  data: TData;
};

export type ErrorResponse = {
  code: string;
  message: string;
  data: null;
};

export type APIResponse<TData> = AxiosPromise<
  SuccessResponse<TData> | ErrorResponse
>;
