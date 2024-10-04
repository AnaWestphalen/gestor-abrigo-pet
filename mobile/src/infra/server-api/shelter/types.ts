import type { Shelter } from "src/core/shelter/types";

export type RemoteShelter = Omit<Shelter, "coordinates"> & {
  latitude: number;
  longitude: number;
};

export type RemotePet = {
  age?: string;
  color?: string;
  description?: string;
  found_in?: string;
  id: number;
  img?: string;
  left_at?: string;
  name: string;
  received_at?: string;
  size?: string;
  shelterId: number;
  specie: string;
  tutor_contact?: string;
  tutor_name?: string;
};
