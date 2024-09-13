import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import serverApi from "src/infra/server-api/serverApi";
import { RepositoryProvider } from "src/domain/shared/RepositoryProvider/RepositoryProvider";

defineCustomElements(window);

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RepositoryProvider repository={serverApi}>
      <App />
    </RepositoryProvider>
  </React.StrictMode>
);
