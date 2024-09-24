import type { AuthServices, User } from "src/core/auth/types";
import { BASE_URL } from "src/infra/server-api/config";

const AUTH_ROUTES = {
  login: `${BASE_URL}/users/sign_in`,
  register: `${BASE_URL}/users`,
  logout: `${BASE_URL}/users/sign_out`,
};

let loggedUser: User | undefined = undefined;

let authorization = "";

const login: AuthServices["login"] = async ({ email, password }) => {
  const adaptedParams = {
    user: {
      email,
      password,
    },
  };

  const response = await fetch(AUTH_ROUTES.login, {
    method: "POST",
    body: JSON.stringify(adaptedParams),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos");
  }

  const body = await response.json();

  console.log("Login reponse body: ", body);

  authorization = `Bearer ${body.auth_token}`;
  loggedUser = {
    id: body.id,
    email: body.email,
    name: body.name,
    phone: body.phone,
  };

  return body;
};

const register: AuthServices["register"] = async ({
  email,
  password,
  name,
  phone,
  role,
}) => {
  const adaptedParams = {
    user: {
      email,
      password,
      password_confirmation: password,
      name,
      phone,
      role: role || "voluntario",
    },
  };

  const response = await fetch(AUTH_ROUTES.register, {
    method: "POST",
    body: JSON.stringify(adaptedParams),
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
  const response = await fetch(AUTH_ROUTES.logout, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deslogar usuário");
  }

  loggedUser = undefined;
};

const whoami: AuthServices["whoami"] = async () => {
  return loggedUser;
};

const authServices: AuthServices = {
  login,
  register,
  logout,
  whoami,
};

export default authServices;
