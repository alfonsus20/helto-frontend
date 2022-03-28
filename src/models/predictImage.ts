import { machineLearningAPI } from "../api";
import { APIResponse } from "../types/apiResponse";
import { Prediction } from "../types/prediction";

export const predictImage = (
  formData: FormData
): Promise<APIResponse<Prediction>> => {
  return machineLearningAPI.post("/predict", formData);
};
