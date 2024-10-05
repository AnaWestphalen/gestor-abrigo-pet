import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

import type { LoginParams, RegisterParams, User } from "src/core/auth/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";
import { useStorage } from "src/domain/shared/StorageProvider/useStorage";
import { useToast } from "src/domain/shared/ToastProvider/useToast";

type AuthServicesContextType = {
  currentUser?: User;
  login: (
    params: LoginParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
  register: (
    params: RegisterParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
  logout: () => Promise<{ success?: boolean; error?: unknown }>;
  whoami: () => Promise<{ success?: boolean; error?: unknown }>;
};

export const AuthServicesContext = createContext<AuthServicesContextType>(
  {} as AuthServicesContextType
);

export const AuthServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();
  const { storage } = useStorage();
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const login = async (params: LoginParams) => {
    try {
      await repository.auth.login(params, storage);
      await whoami();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer login: ${error}`);
      showToast({ message: "E-mail ou senha inválidos", type: "danger" });
      return { error };
    }
  };

  const register = async (params: RegisterParams) => {
    try {
      await repository.auth.register(params, storage);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer registro: ${error}`);
      showToast({ message: "Erro ao fazer registro", type: "danger" });
      return { error };
    }
  };

  const whoami = async () => {
    try {
      const user = await repository.auth.whoami(storage);
      setCurrentUser(user);
      return { user };
    } catch (error) {
      console.error(`Erro ao buscar usuário logado: ${error}`);
      showToast({ message: "Erro ao buscar usuário logado", type: "danger" });
      return { error };
    }
  };

  const logout = async () => {
    try {
      await repository.auth.logout(storage);
      await whoami();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer logout: ${error}`);
      showToast({ message: "Erro ao fazer logout", type: "danger" });
      return { error };
    }
  };

  useEffect(() => {
    if (!currentUser) whoami();
  }, []);

  return (
    <AuthServicesContext.Provider
      value={{ currentUser, login, register, logout, whoami }}
    >
      {children}
    </AuthServicesContext.Provider>
  );
};
