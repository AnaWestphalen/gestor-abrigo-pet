import type { PetServices } from "src/core/pet/types";
import authServices from "src/infra/server-api/auth/authServices";
import { BASE_URL } from "src/infra/server-api/config";
import {
  adaptRemotePet,
  adaptRemotePetLog,
} from "src/infra/server-api/pet/adaptRemotePet";
import type { RemotePet, RemotePetLog } from "src/infra/server-api/pet/types";

const PET_API_ROUTES = {
  GET_PET_DETAILS: `${BASE_URL}/shelters/:shelterId/pets/:id`,
  ADD_PET_LOG: `${BASE_URL}/shelters/:shelterId/pets/:id/logs`,
  GET_PET_LOGS: `${BASE_URL}/shelters/:shelterId/pets/:id/logs`,
};

const getPetDetails: PetServices["getPetDetails"] = async (shelterId, id) => {
  const response = await fetch(
    PET_API_ROUTES.GET_PET_DETAILS.replace(
      ":shelterId",
      `${shelterId}`
    ).replace(":id", `${id}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authServices.authorization}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do pet");
  }

  const body = (await response.json()) as RemotePet;

  console.log("Get pet details response body: ", body);

  return adaptRemotePet(body);
};

const addPetLog: PetServices["addPetLog"] = async (shelterId, id, params) => {
  const response = await fetch(
    PET_API_ROUTES.ADD_PET_LOG.replace(":shelterId", `${shelterId}`).replace(
      ":id",
      `${id}`
    ),
    {
      method: "POST",
      body: JSON.stringify({ log: params }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authServices.authorization}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao adicionar log do pet");
  }
};

const getPetLogs: PetServices["getPetLogs"] = async (shelterId, id) => {
  const response = await fetch(
    PET_API_ROUTES.GET_PET_LOGS.replace(":shelterId", `${shelterId}`).replace(
      ":id",
      `${id}`
    ),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authServices.authorization}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar histórico do pet");
  }

  const body = (await response.json()) as RemotePetLog[];

  console.log("Get pet history response body: ", body);

  return body.map(adaptRemotePetLog);
};

const petServices: PetServices = {
  getPetDetails,
  addPetLog,
  getPetLogs,
};

export default petServices;
