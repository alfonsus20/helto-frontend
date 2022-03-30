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

export type RegisterResponse = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    region: string;
  };
  token: string;
};
