import { useContext } from "react";
import { RepositoryContext } from "src/domain/shared/RepositoryProvider/RepositoryProvider";

export const useRepository = () => {
  return useContext(RepositoryContext);
};
