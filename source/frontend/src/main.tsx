import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import VitamiaApp from "./VitamiaApp.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RecipeProvider } from "./context/RecipeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RecipeProvider>
        <VitamiaApp />
      </RecipeProvider>
    </AuthProvider>
  </StrictMode>,
);
