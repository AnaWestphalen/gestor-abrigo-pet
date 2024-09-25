import type { ShelterServices } from "src/core/shelter/types";
import { authorization } from "src/infra/server-api/auth/authServices";
import { BASE_URL } from "src/infra/server-api/config";

const SHELTER_BASE_URL = `${BASE_URL}/shelters`;

const getShelterDetails: ShelterServices["getShelterDetails"] = async (id) => {
  const response = await fetch(`${SHELTER_BASE_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
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
      Authorization: authorization,
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
      Authorization: authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao editar abrigo");
  }
};

// const closeShelter: ShelterServices["closeShelter"] = async (id) => {
//   const response = await fetch(`${SHELTER_BASE_URL}/${id}/close`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: authorization,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Erro ao fechar abrigo");
//   }
// };

// const addLog: ShelterServices["addLog"] = async (id, { content }) => {
//   const response = await fetch(`${SHELTER_BASE_URL}/${id}/log`, {
//     method: "POST",
//     body: JSON.stringify({ content }),
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": authorization,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Erro ao adicionar log");
//   }
// };

// const getShelterLogs: ShelterServices["getShelterLogs"] = async (id) => {
//   const response = await fetch(`${SHELTER_BASE_URL}/${id}/logs`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": authorization,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Erro ao buscar logs do abrigo");
//   }

//   const body = await response.json();

//   console.log("Get shelter logs response body: ", body);

//   return body;
// };

const registerPet: ShelterServices["registerPet"] = async (
  shelterId,
  params
) => {
  const response = await fetch(
    `${SHELTER_BASE_URL}/${shelterId}/pet/register`,
    {
      method: "POST",
      body: JSON.stringify({ ...params }),
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
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
      Authorization: authorization,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar pets do abrigo");
  }

  const body = await response.json();

  console.log("Get shelter pets response body: ", body);

  return body;
};

const shelterServices: ShelterServices = {
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
