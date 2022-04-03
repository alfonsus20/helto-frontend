export type Author = {
  id: number;
  name: string;
  username: string;
  region: string;
};

export type Thread = {
  id: number;
  content: string;
  authorId: number;
  replyToId?: number;
  replyCount: number;
  likesCount: number;
  threadId?: number;
  createdAt: string;
  UpdatedAt: string;
  thread?: number;
  author: Author;
  likes: any[];
};

export type ThreadDetail = Thread & {
  likes: { user: Author }[];
  repliedBy: Thread[];
};

export type ThreadNewParams = {
  content: string;
};

export type ThreadReplyParams = {
  content: string;
  replyToId: number;
};

export type JoinConsultationResponse = {
  thread: {
    key: string;
  };
};
