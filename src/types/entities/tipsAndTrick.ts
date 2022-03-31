export type TipsAndTrick = {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type TipsAndTrickParams = {
  title: string;
  content: string;
  image: File;
};
