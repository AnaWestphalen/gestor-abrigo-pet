import type { PetServices } from "src/core/pet/types";
// import { BASE_URL } from "src/infra/server-api/config";

const mockLogs = [
  {
    id: 1,
    petId: 1,
    content: "Exemplo de log",
    createdAt: new Date().toISOString(),
    createdBy: "Usuário exemplo",
  },
];

const getPetDetails: PetServices["getPetDetails"] = async (id) => {
  // const response = await fetch(`${BASE_URL}/pet/${id}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao buscar detalhes do pet");
  // }

  // const body = await response.json();

  // console.log("Get pet details response body: ", body);

  // return body;

  // Mock response for development
  return {
    id,
    name: "Rex",
    age: 3,
    color: "Marrom",
    description: "Um cachorro muito simpático",
    foundIn: "Rua dos Bobos, 0",
    size: "Grande",
    species: "Cachorro",
    tutorContact: "123456789",
    tutorName: "John Doe",
    createdAt: new Date().toISOString(),
    createdBy: "Admin",
  };
};

const getPetHistory: PetServices["getPetHistory"] = async (id) => {
  // const response = await fetch(`${BASE_URL}/pet/${id}/history`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao buscar histórico do pet");
  // }

  // const body = await response.json();

  // console.log("Get pet history response body: ", body);

  // return body;

  // Mock response for development
  return [
    {
      id: 1,
      shelterId: 1,
      petId: id,
      receivedAt: new Date().toISOString(),
      leftAt: undefined,
      logs: [],
    },
  ];
};

const editPet: PetServices["editPet"] = async (id, data) => {
  // const response = await fetch(`${BASE_URL}/pet/${id}/update`, {
  //   method: "PATCH",
  //   body: JSON.stringify({ ...data }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao editar pet");
  // }

  // Mock response for development
  console.log("Edit pet mock response: ", { id, ...data });
};

const addPetLog: PetServices["addPetLog"] = async (id, params) => {
  // const response = await fetch(`${BASE_URL}/pet/${id}/log`, {
  //   method: "POST",
  //   body: JSON.stringify({ ...params }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao adicionar log do pet");
  // }

  // Mock response for development
  console.log("Add pet log mock response: ", { id, ...params });
  mockLogs.unshift({
    id: mockLogs.length + 1,
    petId: id,
    content: params.content,
    createdAt: new Date().toISOString(),
    createdBy: params.currentUser,
  });
};

const getPetLogs: PetServices["getPetLogs"] = async () => {
  // const response = await fetch(`${BASE_URL}/pet/${id}/logs`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (!response.ok) {
  //   throw new Error("Erro ao buscar logs do pet");
  // }

  // const body = await response.json();

  // console.log("Get pet logs response body: ", body);

  // return body;

  // Mock response for development
  return mockLogs;
};

const petServices: PetServices = {
  getPetDetails,
  getPetHistory,
  editPet,
  addPetLog,
  getPetLogs,
};

export default petServices;
