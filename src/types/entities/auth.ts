export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  phone: string;
  region: string;
  password: string;
  province: string;
};

export type UserInfo = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  region: string;
  isAdmin: boolean;
  thread?: {
    key: string;
  };
  joined: boolean;
};

export type RegisterResponse = {
  user: UserInfo;
  token: string;
};

export type LoginResponse = RegisterResponse;
