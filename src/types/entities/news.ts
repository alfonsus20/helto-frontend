export type NewsSingle = {
  id: number;
  title: string;
  content: string;
  image: string;
  UpdatedAt: string;
};

export type GetNewsResponse = {
  news: NewsSingle[];
};
