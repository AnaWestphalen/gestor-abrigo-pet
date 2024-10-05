import type { ShelterServices } from "src/core/shelter/types";
import authServices from "src/infra/server-api/auth/authServices";
import { BASE_URL } from "src/infra/server-api/config";
import {
  adaptPetToRemote,
  adaptRemotePet,
} from "src/infra/server-api/pet/adaptRemotePet";
import type { RemotePet } from "src/infra/server-api/pet/types";
import { adaptRemoteShelter } from "src/infra/server-api/shelter/adaptRemoteShelter";
import type { RemoteShelter } from "src/infra/server-api/shelter/types";

const SHELTER_BASE_URL = `${BASE_URL}/shelters`;
const CREATE_PET_URL = `${SHELTER_BASE_URL}/:shelterId/pets`;

const getShelters: ShelterServices["getShelters"] = async () => {
  const response = await fetch(SHELTER_BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authServices.authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar abrigos");
  }

  const body = (await response.json()) as RemoteShelter[];

  console.log("Get shelters response body: ", body);

  return body.map(adaptRemoteShelter);
};

const getShelterDetails: ShelterServices["getShelterDetails"] = async (id) => {
  const response = await fetch(`${SHELTER_BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authServices.authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do abrigo");
  }

  const body = (await response.json()) as { shelter: RemoteShelter };

  console.log("Get shelter details response body: ", body);

  return adaptRemoteShelter(body?.shelter);
};

const createShelter: ShelterServices["createShelter"] = async ({
  name,
  accepts,
  city,
  state,
  address,
  contact,
  coordinates,
  description,
  // img,
}) => {
  const response = await fetch(`${SHELTER_BASE_URL}`, {
    method: "POST",
    body: JSON.stringify({
      shelter: {
        name,
        accepts,
        address,
        contact,
        ...coordinates,
        city,
        state,
        description,
      },
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: authServices.authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao criar abrigo");
  }
};

const editShelter: ShelterServices["editShelter"] = async (id, data) => {
  const response = await fetch(`${SHELTER_BASE_URL}/${id}/update`, {
    method: "PATCH",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
      Authorization: authServices.authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao editar abrigo");
  }
};

const registerPet: ShelterServices["registerPet"] = async (
  shelterId,
  params
) => {
  const adaptedRemotePet = adaptPetToRemote(params);

  const response = await fetch(
    `${CREATE_PET_URL.replace(":shelterId", shelterId.toString())}`,
    {
      method: "POST",
      body: JSON.stringify({ pet: adaptedRemotePet }),
      headers: {
        "Content-Type": "application/json",
        Authorization: authServices.authorization,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao registrar pet");
  }
};

const getShelterPets: ShelterServices["getShelterPets"] = async (id) => {
  const response = await fetch(`${SHELTER_BASE_URL}/${id}/pets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authServices.authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar pets do abrigo");
  }

  const body = (await response.json()) as RemotePet[];

  console.log("Get shelter pets response body: ", body);

  return body.map(adaptRemotePet);
};

const shelterServices: ShelterServices = {
  getShelters,
  getShelterDetails,
  createShelter,
  editShelter,
  // closeShelter,
  // addLog,
  // getShelterLogs,
  registerPet,
  getShelterPets,
};

export default shelterServices;
