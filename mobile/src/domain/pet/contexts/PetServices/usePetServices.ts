import { useContext } from "react";

import { PetServicesContext } from "src/domain/pet/contexts/PetServices/PetServicesProvider";

export const usePetServices = () => {
  const context = useContext(PetServicesContext);

  if (!context) {
    throw new Error("usePetServices must be used within a PetServicesProvider");
  }

  return context;
};
