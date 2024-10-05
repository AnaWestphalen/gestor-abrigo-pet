import { defineCustomElements } from "@ionic/pwa-elements/loader";
// eslint-disable-next-line import/default
import { createRoot } from "react-dom/client";

import { RepositoryProvider } from "src/domain/shared/RepositoryProvider/RepositoryProvider";
import serverApi from "src/infra/server-api/serverApi";

import App from "./App";

defineCustomElements(window);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <RepositoryProvider repository={serverApi}>
    <App />
  </RepositoryProvider>
);
