export type RemotePet = {
  age?: string;
  color?: string;
  description?: string;
  found_in?: string;
  id: number;
  img_url?: string;
  left_at?: string;
  name: string;
  received_at?: string;
  size?: string;
  shelterId: number;
  specie: string;
  tutor_contact?: string;
  tutor_name?: string;
};

export type RemotePetLog = {
  id: number;
  content: string;
  created_at: string;
  created_by_id: number;
  created_by_email: string;
  updated_at: string;
};
