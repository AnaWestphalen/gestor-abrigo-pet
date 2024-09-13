import { type FC, type ReactNode, createContext } from "react";

import type {
  AddLogParams,
  CreateShelterParams,
  EditShelterParams,
  RegisterPetParams,
  Shelter,
  ShelterLog,
} from "src/core/shelter/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";

type ShelterServicesContextType = {
  getShelterDetails: (
    id: string
  ) => Promise<{ success?: Shelter; error?: unknown }>;
  createShelter: (
    params: CreateShelterParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
  editShelter: (
    id: string,
    data: EditShelterParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
  closeShelter: (id: string) => Promise<{ success?: boolean; error?: unknown }>;
  addLog: (
    shelterId: string,
    params: AddLogParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
  getShelterLogs: (
    id: string
  ) => Promise<{ success?: ShelterLog[]; error?: unknown }>;
  registerPet: (
    shelterId: string,
    params: RegisterPetParams
  ) => Promise<{ success?: boolean; error?: unknown }>;
};

export const ShelterServicesContext = createContext<ShelterServicesContextType>(
  {} as ShelterServicesContextType
);

export const ShelterServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();

  const getShelterDetails = async (id: string) => {
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

  const editShelter = async (id: string, data: EditShelterParams) => {
    try {
      await repository.shelter.editShelter(id, data);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const closeShelter = async (id: string) => {
    try {
      await repository.shelter.closeShelter(id);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const addLog = async (shelterId: string, params: AddLogParams) => {
    try {
      await repository.shelter.addLog(shelterId, params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const getShelterLogs = async (id: string) => {
    try {
      const logs = await repository.shelter.getShelterLogs(id);
      return { success: logs };
    } catch (error) {
      return { error };
    }
  };

  const registerPet = async (shelterId: string, params: RegisterPetParams) => {
    try {
      await repository.shelter.registerPet(shelterId, params);
      return { success: true };
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
      }}
    >
      {children}
    </ShelterServicesContext.Provider>
  );
};
