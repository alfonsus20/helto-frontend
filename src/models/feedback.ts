import { coreAPI } from "../api";

import { AxiosPromise } from "axios";
import { APIResponse } from "../types/apiResponse";
import { Feedback, FeedbackData } from "../types/entities/feedback";

export const postFeedback = (
  params: Feedback
): AxiosPromise<APIResponse<null>> => {
  return coreAPI.post("/feedback", params);
};

export const getFeedbackList = (
  params?: string
): AxiosPromise<
  APIResponse<{ feedback: Array<FeedbackData>; totalData: number }>
> => {
  return coreAPI.get(`/feedback${params}`);
};
