import type { AuthServices } from "src/core/auth/types";
import { BASE_URL } from "src/infra/server-api/config";

const login: AuthServices["login"] = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos");
  }

  const body = await response.json();

  console.log("Login reponse body: ", body);

  return body;
};

const register: AuthServices["register"] = async ({
  email,
  password,
  name,
  phone,
}) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, phone }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar usuário");
  }

  const body = await response.json();

  console.log("Register reponse body: ", body);

  return body;
};

const logout: AuthServices["logout"] = async () => {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deslogar usuário");
  }
};

const whoami: AuthServices["whoami"] = async () => {
  const response = await fetch(`${BASE_URL}/auth/whoami`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }

  const body = await response.json();

  console.log("Whoami reponse body: ", body);

  return body;
};

const authServices: AuthServices = {
  login,
  register,
  logout,
  whoami,
};

export default authServices;
