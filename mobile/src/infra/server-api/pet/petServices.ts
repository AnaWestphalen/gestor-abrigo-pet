import type { PetServices } from "src/core/pet/types";
import { BASE_URL } from "src/infra/server-api/config";

const getPetDetails: PetServices["getPetDetails"] = async (id) => {
  const response = await fetch(`${BASE_URL}/pet/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do pet");
  }

  const body = await response.json();

  console.log("Get pet details response body: ", body);

  return body;
};

const getPetHistory: PetServices["getPetHistory"] = async (id) => {
  const response = await fetch(`${BASE_URL}/pet/${id}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar histórico do pet");
  }

  const body = await response.json();

  console.log("Get pet history response body: ", body);

  return body;
};

const editPet: PetServices["editPet"] = async (id, data) => {
  const response = await fetch(`${BASE_URL}/pet/${id}/update`, {
    method: "PATCH",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao editar pet");
  }
};

const addPetLog: PetServices["addPetLog"] = async (petId, params) => {
  const response = await fetch(`${BASE_URL}/pet/${petId}/log`, {
    method: "POST",
    body: JSON.stringify({ ...params }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar log ao pet");
  }
};

const getPetLogs: PetServices["getPetLogs"] = async (id) => {
  const response = await fetch(`${BASE_URL}/pet/${id}/logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar logs do pet");
  }

  const body = await response.json();

  console.log("Get pet logs response body: ", body);

  return body;
};

const petServices: PetServices = {
  getPetDetails,
  getPetHistory,
  editPet,
  addPetLog,
  getPetLogs,
};

export default petServices;
