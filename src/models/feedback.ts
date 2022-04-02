import { coreAPI } from "../api";

import { AxiosPromise } from "axios";
import { APIResponse } from "../types/apiResponse";
import { Feedback } from "../types/entities/feedback";

export const postFeedback = (
  params: Feedback
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post("/feedback", params);
};
