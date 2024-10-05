import type { Shelter } from "src/core/shelter/types";
import type { RemoteShelter } from "src/infra/server-api/shelter/types";

export const adaptRemoteShelter = (remoteShelter: RemoteShelter): Shelter => {
  const { latitude, longitude, created_at, created_by_email, ...shelter } =
    remoteShelter;
  return {
    ...shelter,
    coordinates: latitude && longitude ? { latitude, longitude } : undefined,
    createdAt: created_at,
    createdBy: created_by_email,
  };
};
