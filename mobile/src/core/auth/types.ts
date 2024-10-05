import type { Storage } from "@ionic/storage";

export type User = {
  allowedIn?: number[];
  createdAt?: string;
  email: string;
  id: number;
  name?: string;
  phone?: string;
  role?: string;
};

export type RegisterParams = {
  email: string;
  name?: string;
  password: string;
  phone?: string;
  role?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type AuthServices = {
  authorization: string;
  register: (params: RegisterParams, storage: Storage | null) => Promise<void>;
  login: (params: LoginParams, storage: Storage | null) => Promise<void>;
  logout: (storage: Storage | null) => Promise<void>;
  whoami: (storage: Storage | null) => Promise<User | undefined>;
};
