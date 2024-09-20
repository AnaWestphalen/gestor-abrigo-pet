import type { Pet } from "src/core/pet/types";
import type { ShelterServices } from "src/core/shelter/types";
import { BASE_URL } from "src/infra/server-api/config";

const getShelterDetails: ShelterServices["getShelterDetails"] = async (id) => {
  const response = await fetch(`${BASE_URL}/shelters/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do abrigo");
  }

  const body = await response.json();

  console.log("Get shelter details response body: ", body);

  return body;
};

const createShelter: ShelterServices["createShelter"] = async ({
  name,
  accepts,
  city,
  state,
  address,
  contact,
  coordinates,
  // img,
}) => {
  const response = await fetch(`${BASE_URL}/shelters`, {
    method: "POST",
    body: JSON.stringify({
      name,
      accepts,
      address,
      contact,
      ...coordinates,
      city,
      state,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao criar abrigo");
  }
};

const editShelter: ShelterServices["editShelter"] = async (id, data) => {
  const response = await fetch(`${BASE_URL}/shelters/${id}/update`, {
    method: "PATCH",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao editar abrigo");
  }
};

const closeShelter: ShelterServices["closeShelter"] = async (id) => {
  const response = await fetch(`${BASE_URL}/shelters/${id}/close`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao fechar abrigo");
  }
};

const addLog: ShelterServices["addLog"] = async (id, { content }) => {
  const response = await fetch(`${BASE_URL}/shelters/${id}/log`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar log");
  }
};

const getShelterLogs: ShelterServices["getShelterLogs"] = async (id) => {
  const response = await fetch(`${BASE_URL}/shelters/${id}/logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar logs do abrigo");
  }

  const body = await response.json();

  console.log("Get shelter logs response body: ", body);

  return body;
};

const registerPet: ShelterServices["registerPet"] = async (
  shelterId,
  params
) => {
  const response = await fetch(
    `${BASE_URL}/shelters/${shelterId}/pet/register`,
    {
      method: "POST",
      body: JSON.stringify({ ...params }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao registrar pet");
  }
};

const getShelterPets: ShelterServices["getShelterPets"] = async (id) => {
  // const response = await fetch(`${BASE_URL}/shelters/${id}/pets`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao buscar pets do abrigo");
  // }

  // const body = await response.json();

  // console.log("Get shelter pets response body: ", body);

  // return body;
  // Mock response for development
  const mockResponse = [
    {
      id: 1,
      name: "Pet 1",
      age: 2,
      species: "cachorro",
      color: "preto",
      description: "Pet 1 description",
    },
    {
      id: 2,
      name: "Pet 2",
      age: 3,
      species: "gato",
      color: "branco",
      description: "Pet 2 description",
    },
  ] satisfies Pet[];

  console.log(`Get shelter pets mock response for id: ${id}`, mockResponse);

  return mockResponse;
};

const shelterServices: ShelterServices = {
  getShelterDetails,
  createShelter,
  editShelter,
  closeShelter,
  addLog,
  getShelterLogs,
  registerPet,
  getShelterPets,
};

export default shelterServices;
