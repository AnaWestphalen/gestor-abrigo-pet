import type { Pet, PetLog } from "src/core/pet/types";
import type { RegisterPetParams } from "src/core/shelter/types";
import type { RemotePet, RemotePetLog } from "src/infra/server-api/pet/types";

export const adaptRemotePet = (remotePet: RemotePet): Pet => {
  const {
    found_in,
    left_at,
    received_at,
    tutor_contact,
    tutor_name,
    img_url,
    specie,
    ...rest
  } = remotePet;
  return {
    ...rest,
    img: img_url,
    species: specie,
    foundIn: found_in,
    leftAt: left_at,
    receivedAt: received_at,
    tutorContact: tutor_contact,
    tutorName: tutor_name,
  };
};

export const adaptPetToRemote = (
  pet: Pet | RegisterPetParams
): Partial<RemotePet> => {
  const {
    foundIn,
    leftAt,
    receivedAt,
    tutorContact,
    tutorName,
    species,
    ...rest
  } = pet;
  return {
    ...rest,
    specie: species,
    found_in: foundIn,
    left_at: leftAt instanceof Date ? leftAt.toISOString() : leftAt,
    received_at:
      receivedAt instanceof Date ? receivedAt.toISOString() : receivedAt,
    tutor_contact: tutorContact,
    tutor_name: tutorName,
  };
};

export const adaptRemotePetLog = (remotePetLog: RemotePetLog): PetLog => {
  const { created_by_email, created_at, ...rest } = remotePetLog;
  return {
    ...rest,
    createdBy: created_by_email,
    createdAt: created_at,
  };
};
