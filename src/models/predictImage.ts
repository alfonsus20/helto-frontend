import { machineLearningAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { Prediction } from "../types/prediction";
import { AxiosPromise } from "axios";

export const predictImage = (
  formData: FormData
): AxiosPromise<APIResponse<Prediction>> => {
  return machineLearningAPI.post("/predict", formData);
};
