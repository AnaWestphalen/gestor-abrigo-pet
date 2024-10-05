import type { Log } from "src/core/shared/types";

export type Pet = {
  age?: string;
  color?: string;
  createdAt?: string;
  createdBy?: string;
  description?: string;
  foundIn?: string;
  id: number;
  img?: string;
  leftAt?: string;
  name: string;
  receivedAt?: string;
  size?: string;
  shelterId: number;
  species: string;
  tutorContact?: string;
  tutorName?: string;
};

export type PetLog = Log;

export type AddPetLogParams = {
  content: string;
};

export type PetServices = {
  getPetDetails: (shelterId: number, id: number) => Promise<Pet>;
  addPetLog: (
    shelterId: number,
    id: number,
    params: AddPetLogParams
  ) => Promise<void>;
  getPetLogs: (shelterId: number, id: number) => Promise<PetLog[]>;
};
