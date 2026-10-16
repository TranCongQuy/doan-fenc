import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { AppProviders } from "./app/providers";
import { router } from "./app/router";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/print.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Không tìm thấy #root");

createRoot(rootEl).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
