import { useContext } from "react";

import { ShelterServicesContext } from "src/domain/shelter/contexts/ShelterServices/ShelterServicesProvider";

export const useShelterServices = () => {
  const context = useContext(ShelterServicesContext);

  if (!context) {
    throw new Error(
      "useShelterServices must be used within a ShelterServicesProvider"
    );
  }

  return context;
};
