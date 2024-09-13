import type { LoginParams, RegisterParams } from "src/core/auth/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";

export const useAuthServices = () => {
  const { repository } = useRepository();

  const login = async (params: LoginParams) => {
    try {
      await repository.auth.login(params);
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
      return { user };
    } catch (error) {
      console.error(`Erro ao buscar usuário logado: ${error}`);
      return { error };
    }
  };

  const logout = async () => {
    try {
      await repository.auth.logout();
      return { success: true };
    } catch (error) {
      console.error(`Erro ao fazer logout: ${error}`);
      return { error };
    }
  };

  return { login, register, whoami, logout };
};
