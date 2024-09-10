import type { Pet } from "src/core/pet/types";
import type { Coordinates, Log } from "src/core/shared/types";

export type ShelterDetails = {
  accepts?: string[];
  address?: string;
  contact?: string;
  coordinates?: Coordinates;
  createdAt?: string;
  createdBy?: string;
  closedAt?: string;
  id: string;
  img?: string;
  logs?: ShelterLog[];
  name: string;
};

export type ShelterLog = Log & {
  shelterId: string;
};

export type CreateShelterParams = {
  accepts?: string[];
  address?: string;
  contact?: string;
  coordinates?: Coordinates;
  img?: string;
  name: string;
};

export type EditShelterParams = {
  accepts?: string[];
  address?: string;
  contact?: string;
  coordinates?: Coordinates;
  img?: string;
  name?: string;
};

export type AddLogParams = {
  content: string;
};

export type RegisterPetParams = Omit<Pet, "id" | "createdAt" | "createdBy">;

export type ShelterServices = {
  getShelterDetails: () => Promise<ShelterDetails>;
  createShelter: (params: CreateShelterParams) => Promise<void>;
  editShelter: (params: EditShelterParams) => Promise<void>;
  closeShelter: () => Promise<void>;
  addLog: (params: AddLogParams) => Promise<void>;
  getShelterLogs: () => Promise<ShelterLog[]>;
  registerPet: (params: RegisterPetParams) => Promise<void>;
};
