import type { Pet } from "src/core/pet/types";
import type { Coordinates, Log } from "src/core/shared/types";

export type Shelter = {
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

export type EditShelterParams = Partial<
  Omit<Shelter, "id" | "createdAt" | "createdBy">
>;

export type AddLogParams = {
  content: string;
};

export type RegisterPetParams = Omit<Pet, "id" | "createdAt" | "createdBy">;

export type ShelterServices = {
  getShelterDetails: (id: string) => Promise<Shelter>;
  createShelter: (params: CreateShelterParams) => Promise<void>;
  editShelter: (id: string, data: EditShelterParams) => Promise<void>;
  closeShelter: (id: string) => Promise<void>;
  addLog: (shelterId: string, params: AddLogParams) => Promise<void>;
  getShelterLogs: (id: string) => Promise<ShelterLog[]>;
  registerPet: (shelterId: string, params: RegisterPetParams) => Promise<void>;
};
