import { useContext } from "react";
import { AuthServicesContext } from "src/domain/auth/contexts/AuthServices/AuthServicesProvider";

export const useAuthServices = () => {
  const context = useContext(AuthServicesContext);

  if (!context) {
    throw new Error(
      "useAuthServices must be used within a AuthServicesProvider"
    );
  }

  return context;
};
