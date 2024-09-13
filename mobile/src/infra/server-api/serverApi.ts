import auth from "src/infra/server-api/auth/authServices";
import pet from "src/infra/server-api/pet/petServices";
import shelter from "src/infra/server-api/shelter/shelterServices";
import type { ServerApi } from "src/infra/server-api/types";

const serverApi: ServerApi = {
  auth,
  pet,
  shelter,
};

export default serverApi;
