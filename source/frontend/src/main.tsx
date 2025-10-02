import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import VitamiaApp from "./VitamiaApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VitamiaApp />
  </StrictMode>
);
