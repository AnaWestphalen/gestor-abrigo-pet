import type { Pet } from "src/core/pet/types";
import type { Shelter, ShelterServices } from "src/core/shelter/types";
import { BASE_URL } from "src/infra/server-api/config";

const getShelterDetails: ShelterServices["getShelterDetails"] = async (id) => {
  // const response = await fetch(`${BASE_URL}/shelter/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  /** mock */
  const response = {
    ok: true,
    json: async () =>
      ({
        id,
        name: `Abrigo #${id}`,
        accepts: ["cachorro", "gato"],
        address: "Rua 1, 123",
        contact: "11999999999",
        coordinates: {
          latitude: -23.5505,
          longitude: -46.6333,
        },
        img: "https://via.placeholder.com/150",
      }) satisfies Shelter,
  };

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
  address,
  contact,
  coordinates,
  img,
}) => {
  const response = await fetch(`${BASE_URL}/shelter/create`, {
    method: "POST",
    body: JSON.stringify({ name, accepts, address, contact, coordinates, img }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao criar abrigo");
  }
};

const editShelter: ShelterServices["editShelter"] = async (id, data) => {
  const response = await fetch(`${BASE_URL}/shelter/${id}/update`, {
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
  const response = await fetch(`${BASE_URL}/shelter/${id}/close`, {
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
  const response = await fetch(`${BASE_URL}/shelter/${id}/log`, {
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
  const response = await fetch(`${BASE_URL}/shelter/${id}/logs`, {
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
    `${BASE_URL}/shelter/${shelterId}/pet/register`,
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
  // const response = await fetch(`${BASE_URL}/shelter/${id}/pets`, {
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
  return [
    {
      id: 1,
      name: "Pet 1",
      age: 2,
      color: "preto",
      description: "Pet 1 description",
    },
    {
      id: 2,
      name: "Pet 2",
      age: 3,
      color: "branco",
      description: "Pet 2 description",
    },
  ];
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
