import { createContext, type FC } from "react";
import type { Repository } from "src/core/repository/types";
import type { RepositoryProviderProps } from "./types";

export const RepositoryContext = createContext<Repository | null>(null);

export const RepositoryProvider: FC<RepositoryProviderProps> = ({
  children,
  repository,
}) => {
  return (
    <RepositoryContext.Provider value={repository}>
      {children}
    </RepositoryContext.Provider>
  );
};
