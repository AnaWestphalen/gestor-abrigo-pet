import type { AuthServices } from "src/core/auth/types";
import type { PetServices } from "src/core/pet/types";
import type { ShelterServices } from "src/core/shelter/types";

export interface Repository {
  auth: AuthServices;
  pet: PetServices;
  shelter: ShelterServices;
}
