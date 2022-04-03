export type Media = {
  id: number;
  link: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type GetMediaResponse = {
  media: Media[];
  totalData: number;
};

export type GetSingleMediaResponse = {
  media: Media;
};

export type MediaParams = {
  link: string;
  description: string;
};
