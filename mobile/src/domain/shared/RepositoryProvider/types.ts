import type { ReactNode } from "react";

import type { Repository } from "src/core/repository/types";

export type RepositoryProviderProps = {
  children: ReactNode;
  repository: Repository;
};
