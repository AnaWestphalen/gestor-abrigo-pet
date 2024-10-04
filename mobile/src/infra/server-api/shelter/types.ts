import type { Shelter } from "src/core/shelter/types";

export type RemoteShelter = Omit<Shelter, "coordinates"> & {
  latitude: number;
  longitude: number;
};
