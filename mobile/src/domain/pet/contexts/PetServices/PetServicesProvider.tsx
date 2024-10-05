import { type FC, type ReactNode, createContext } from "react";

import type { AddPetLogParams, Pet, PetLog } from "src/core/pet/types";
import type { RegisterPetParams } from "src/core/shelter/types";
import { useRepository } from "src/domain/shared/RepositoryProvider/useRepository";
import type { ServiceResponse } from "src/domain/shared/types";

type PetServicesContextType = {
  getPetDetails: (
    shelterId: number,
    id: number
  ) => Promise<ServiceResponse<Pet>>;
  addPetLog: (
    shelterId: number,
    id: number,
    params: AddPetLogParams
  ) => Promise<ServiceResponse>;
  getPetLogs: (
    shelterId: number,
    id: number
  ) => Promise<ServiceResponse<PetLog[]>>;
  addPet: (
    shelterId: number,
    pet: RegisterPetParams
  ) => Promise<ServiceResponse>;
};

export const PetServicesContext = createContext<PetServicesContextType>(
  {} as PetServicesContextType
);

export const PetServicesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { repository } = useRepository();

  const getPetDetails = async (shelterId: number, id: number) => {
    try {
      const pet = await repository.pet.getPetDetails(shelterId, id);
      return { success: pet };
    } catch (error) {
      return { error };
    }
  };

  const addPetLog = async (
    shelterId: number,
    id: number,
    params: AddPetLogParams
  ) => {
    try {
      await repository.pet.addPetLog(shelterId, id, params);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const getPetLogs = async (shelterId: number, id: number) => {
    try {
      const logs = await repository.pet.getPetLogs(shelterId, id);
      return { success: logs };
    } catch (error) {
      return { error };
    }
  };

  const addPet = async (shelterId: number, pet: RegisterPetParams) => {
    try {
      await repository.shelter.registerPet(shelterId, pet);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  return (
    <PetServicesContext.Provider
      value={{
        getPetDetails,
        addPetLog,
        getPetLogs,
        addPet,
      }}
    >
      {children}
    </PetServicesContext.Provider>
  );
};
