import type { AuthServices, User } from "src/core/auth/types";
// import { BASE_URL } from "src/infra/server-api/config";

let isMockLoggedIn = false;

// const AUTH_ROUTES = {
//   login: "/auth/login",
//   register: "/auth/register",
//   logout: "/auth/logout",
//   whoami: "/auth/whoami",
// };

const login: AuthServices["login"] = async () => {
  // const response = await fetch(`${BASE_URL}${AUTH_ROUTES.login}`, {
  //   method: "POST",
  //   body: JSON.stringify({ email, password }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  isMockLoggedIn = true;

  const response = {
    ok: true,
    json: async () => Promise.resolve(undefined),
  };

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos");
  }

  const body = await response.json();

  console.log("Login reponse body: ", body);

  return body;
};

const register: AuthServices["register"] = async () => {
  // const response = await fetch(`${BASE_URL}${AUTH_ROUTES.register}`, {
  //   method: "POST",
  //   body: JSON.stringify(params),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const response = {
    ok: true,
    json: async () => Promise.resolve(undefined),
  };

  if (!response.ok) {
    throw new Error("Erro ao registrar usuário");
  }

  const body = await response.json();

  console.log("Register reponse body: ", body);

  return body;
};

const logout: AuthServices["logout"] = async () => {
  // const response = await fetch(`${BASE_URL}${AUTH_ROUTES.logout}`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const response = {
    ok: true,
    json: async () => Promise.resolve(undefined),
  };

  isMockLoggedIn = false;

  if (!response.ok) {
    throw new Error("Erro ao deslogar usuário");
  }
};

const whoami: AuthServices["whoami"] = async () => {
  // const response = await fetch(`${BASE_URL}${AUTH_ROUTES.whoami}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const response = {
    ok: true,
    json: async () =>
      Promise.resolve(
        isMockLoggedIn
          ? ({
              id: 1,
              name: "John Doe",
              email: "john@doe.com",
              phone: "123456789",
              role: "user",
              createdAt: "2021-09-01T00:00:00Z",
              allowedIn: [1, 2],
            } satisfies User)
          : undefined
      ),
  };

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
