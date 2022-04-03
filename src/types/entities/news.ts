export type NewsSingle = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  image: string;
  createdAt: string;
  UpdatedAt: string;
};

export type GetNewsResponse = {
  news: NewsSingle[];
  totalData: number;
};

export type GetSingleNewsResponse = {
  news: NewsSingle;
};

export type NewsParams = {
  title: string;
  content: string;
  image: File;
};
