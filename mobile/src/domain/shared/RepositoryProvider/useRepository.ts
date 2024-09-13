import { useContext } from "react";
import { RepositoryContext } from "src/domain/shared/RepositoryProvider/RepositoryProvider";

export const useRepository = () => {
  const repository = useContext(RepositoryContext);

  if (!repository) {
    throw new Error("useRepository must be used within a RepositoryProvider");
  }

  return { repository };
};
