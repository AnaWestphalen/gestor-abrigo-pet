import type { Coordinates, Log } from "src/core/shared/types";

export type Pet = {
  age?: number;
  color?: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  foundIn?: Coordinates | string;
  id: string;
  img?: string;
  name: string;
  size?: string;
  species?: string;
  tutorContact?: string;
  tutorName?: string;
};

export type PetLog = Log & {
  petId: string;
};

export type PetShelterHistory = {
  id: string;
  shelterId: string;
  petId: string;
  receivedAt?: string;
  leftAt?: string;
  logs?: PetLog[];
};

export type PetServices = {
  getPetDetails: (id: string) => Promise<Pet>;
  getPetHistory: (id: string) => Promise<PetShelterHistory[]>;
  editPet: (id: string, pet: Partial<Pet>) => Promise<void>;
  addPetLog: (id: string, content: string) => Promise<void>;
  getPetLogs: (id: string) => Promise<PetLog[]>;
};
