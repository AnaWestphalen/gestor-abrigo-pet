import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import type { LoginParams, RegisterParams, User } from "src/core/auth/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";

type AuthServicesContextType = {
  currentUser?: User;
  login: (params: LoginParams) => Promise<{ success?: boolean; error?: any }>;
  register: (
    params: RegisterParams
  ) => Promise<{ success?: boolean; error?: any }>;
  logout: () => Promise<{ success?: boolean; error?: any }>;
};

export const AuthServicesContext = createContext<AuthServicesContextType>(
  {} as AuthServicesContextType
);

export const AuthServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const login = async (params: LoginParams) => {
    try {
      await repository.auth.login(params);
      await whoami();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer login: ${error}`);
      return { error };
    }
  };

  const register = async (params: RegisterParams) => {
    try {
      await repository.auth.register(params);
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer registro: ${error}`);
      return { error };
    }
  };

  const whoami = async () => {
    try {
      const user = await repository.auth.whoami();
      setCurrentUser(user);
      return { user };
    } catch (error) {
      console.error(`Erro ao buscar usuário logado: ${error}`);
      return { error };
    }
  };

  const logout = async () => {
    try {
      await repository.auth.logout();
      await whoami();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer logout: ${error}`);
      return { error };
    }
  };

  useEffect(() => {
    if (!currentUser) whoami();
  }, []);

  return (
    <AuthServicesContext.Provider
      value={{ currentUser, login, register, logout }}
    >
      {children}
    </AuthServicesContext.Provider>
  );
};
