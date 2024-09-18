import { type FC, type ReactNode, createContext } from "react";

import type { Pet } from "src/core/pet/types";
import type {
  AddLogParams,
  CreateShelterParams,
  EditShelterParams,
  RegisterPetParams,
  Shelter,
  ShelterLog,
} from "src/core/shelter/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";
import type { ServiceResponse } from "src/domain/shared/types";

type ShelterServicesContextType = {
  getShelterDetails: (id: number) => Promise<ServiceResponse<Shelter>>;
  createShelter: (params: CreateShelterParams) => Promise<ServiceResponse>;
  editShelter: (
    id: number,
    data: EditShelterParams
  ) => Promise<ServiceResponse>;
  closeShelter: (id: number) => Promise<ServiceResponse>;
  addLog: (shelterId: number, params: AddLogParams) => Promise<ServiceResponse>;
  getShelterLogs: (id: number) => Promise<ServiceResponse<ShelterLog[]>>;
  registerPet: (
    shelterId: number,
    params: RegisterPetParams
  ) => Promise<ServiceResponse>;
  getShelterPets: (id: number) => Promise<ServiceResponse<Pet[]>>;
};

export const ShelterServicesContext = createContext<ShelterServicesContextType>(
  {} as ShelterServicesContextType
);

export const ShelterServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();

  const getShelterDetails = async (id: number) => {
    try {
      const shelter = await repository.shelter.getShelterDetails(id);
      return { success: shelter };
    } catch (error) {
      return { error };
    }
  };

  const createShelter = async (params: CreateShelterParams) => {
    try {
      await repository.shelter.createShelter(params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const editShelter = async (id: number, data: EditShelterParams) => {
    try {
      await repository.shelter.editShelter(id, data);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const closeShelter = async (id: number) => {
    try {
      await repository.shelter.closeShelter(id);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const addLog = async (shelterId: number, params: AddLogParams) => {
    try {
      await repository.shelter.addLog(shelterId, params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const getShelterLogs = async (id: number) => {
    try {
      const logs = await repository.shelter.getShelterLogs(id);
      return { success: logs };
    } catch (error) {
      return { error };
    }
  };

  const registerPet = async (shelterId: number, params: RegisterPetParams) => {
    try {
      await repository.shelter.registerPet(shelterId, params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const getShelterPets = async (id: number) => {
    try {
      const pets = await repository.shelter.getShelterPets(id);
      return { success: pets };
    } catch (error) {
      return { error };
    }
  };

  return (
    <ShelterServicesContext.Provider
      value={{
        getShelterDetails,
        createShelter,
        editShelter,
        closeShelter,
        addLog,
        getShelterLogs,
        registerPet,
        getShelterPets,
      }}
    >
      {children}
    </ShelterServicesContext.Provider>
  );
};
