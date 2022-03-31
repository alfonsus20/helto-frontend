import { AxiosError } from "axios";
import { Notyf } from "notyf";
import { IMAGE_URL } from "./constants";

export const getEmbedYoutubeURL = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoID = match && match[2].length === 11 ? match[2] : null;
  return `https://www.youtube.com/embed/${videoID}`;
};

export const getImageURL = (filename: string) => `${IMAGE_URL}/${filename}`;

export const errorHandler = (error: AxiosError) => {
  new Notyf().error(error.response?.data.message || "Terjadi Kesalahan");
};
