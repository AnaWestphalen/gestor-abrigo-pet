import { defineCustomElements } from "@ionic/pwa-elements/loader";
// eslint-disable-next-line import/default
import React from "react";
import { createRoot } from "react-dom/client";

import { RepositoryProvider } from "src/domain/shared/RepositoryProvider/RepositoryProvider";
import serverApi from "src/infra/server-api/serverApi";

import App from "./App";

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
