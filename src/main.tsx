import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ClientProvider } from "./context/ClientContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProvider>
      <App />
    </ClientProvider>
  </React.StrictMode>
);
