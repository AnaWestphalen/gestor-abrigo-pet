export type User = {
  allowedIn?: string[];
  createdAt?: string;
  email: string;
  id: string;
  name?: string;
  phone?: string;
  role?: string;
};

export type RegisterParams = {
  email: string;
  name?: string;
  password: string;
  phone?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type AuthServices = {
  register: (params: RegisterParams) => Promise<void>;
  login: (params: LoginParams) => Promise<void>;
  logout: () => Promise<void>;
  whoami: () => Promise<User>;
};
