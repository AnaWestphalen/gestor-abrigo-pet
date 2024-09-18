import type { Coordinates, Log } from "src/core/shared/types";

export type Pet = {
  age?: number;
  color?: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  foundIn?: Coordinates | string;
  id: number;
  img?: string;
  name: string;
  size?: string;
  species?: string;
  tutorContact?: string;
  tutorName?: string;
};

export type PetLog = Log & {
  petId: number;
};

export type PetShelterHistory = {
  id: number;
  shelterId: number;
  petId: number;
  receivedAt?: string;
  leftAt?: string;
  logs?: PetLog[];
};

export type AddPetLogParams = {
  content: string;
};

export type PetServices = {
  getPetDetails: (id: number) => Promise<Pet>;
  getPetHistory: (id: number) => Promise<PetShelterHistory[]>;
  editPet: (id: number, pet: Partial<Pet>) => Promise<void>;
  addPetLog: (id: number, params: AddPetLogParams) => Promise<void>;
  getPetLogs: (id: number) => Promise<PetLog[]>;
};
