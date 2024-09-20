import { type FC, type ReactNode, createContext } from "react";

import type {
  AddPetLogParams,
  Pet,
  PetLog,
  PetShelterHistory,
} from "src/core/pet/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";
import type { ServiceResponse } from "src/domain/shared/types";

type PetServicesContextType = {
  getPetDetails: (id: number) => Promise<ServiceResponse<Pet>>;
  getPetHistory: (id: number) => Promise<ServiceResponse<PetShelterHistory[]>>;
  editPet: (id: number, pet: Partial<Pet>) => Promise<ServiceResponse>;
  addPetLog: (id: number, params: AddPetLogParams) => Promise<ServiceResponse>;
  getPetLogs: (id: number) => Promise<ServiceResponse<PetLog[]>>;
};

export const PetServicesContext = createContext<PetServicesContextType>(
  {} as PetServicesContextType
);

export const PetServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();

  const getPetDetails = async (id: number) => {
    try {
      const pet = await repository.pet.getPetDetails(id);
      return { success: pet };
    } catch (error) {
      return { error };
    }
  };

  const getPetHistory = async (id: number) => {
    try {
      const history = await repository.pet.getPetHistory(id);
      return { success: history };
    } catch (error) {
      return { error };
    }
  };

  const editPet = async (id: number, pet: Partial<Pet>) => {
    try {
      await repository.pet.editPet(id, pet);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const addPetLog = async (id: number, params: AddPetLogParams) => {
    try {
      await repository.pet.addPetLog(id, params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const getPetLogs = async (id: number) => {
    try {
      const logs = await repository.pet.getPetLogs(id);
      return { success: logs };
    } catch (error) {
      return { error };
    }
  };

  return (
    <PetServicesContext.Provider
      value={{
        getPetDetails,
        getPetHistory,
        editPet,
        addPetLog,
        getPetLogs,
      }}
    >
      {children}
    </PetServicesContext.Provider>
  );
};
