import type { Pet } from "src/core/pet/types";
import type { Coordinates, Log } from "src/core/shared/types";

export type Shelter = {
  accepts?: string[];
  address?: string;
  city?: string;
  contact?: string;
  coordinates?: Coordinates;
  createdAt?: string;
  createdBy?: string;
  closedAt?: string;
  description?: string;
  id: number;
  img?: string;
  name: string;
  state?: string;
  updatedAt?: string;
};

export type ShelterLog = Log & {
  shelterId: number;
};

export type CreateShelterParams = {
  accepts?: string[];
  address?: string;
  city: string;
  contact?: string;
  coordinates?: Coordinates;
  description?: string;
  // img?: string;
  name: string;
  state: string;
};

export type EditShelterParams = Partial<
  Omit<Shelter, "id" | "createdAt" | "createdBy">
>;

export type AddLogParams = {
  content: string;
};

export type RegisterPetParams = {
  age?: string;
  color?: string;
  description?: string;
  foundIn?: string;
  img?: string;
  leftAt?: Date;
  name: string;
  receivedAt?: Date;
  size?: string;
  shelterId: number;
  species: string;
  tutorContact?: string;
  tutorName?: string;
};

export type ShelterServices = {
  getShelters: () => Promise<Shelter[]>;
  getShelterDetails: (id: number) => Promise<Shelter>;
  createShelter: (params: CreateShelterParams) => Promise<void>;
  editShelter: (id: number, data: EditShelterParams) => Promise<void>;
  // closeShelter: (id: number) => Promise<void>;
  // addLog: (shelterId: number, params: AddLogParams) => Promise<void>;
  // getShelterLogs: (id: number) => Promise<ShelterLog[]>;
  registerPet: (shelterId: number, params: RegisterPetParams) => Promise<void>;
  getShelterPets: (id: number) => Promise<Pet[]>;
};
