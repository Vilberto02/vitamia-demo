
import { Register } from "../components/Register";
import NameVitamia from "@/assets/name-bg-vitamia.svg";

export function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--color-background-page)] p-4 overflow-y-hidden">
      <div className="max-w-5xl w-full z-10">
        <Register />
      </div>
      <img
        src={NameVitamia}
        alt="Nombre de Vitamia"
        className="absolute -bottom-15 left-1/2 -translate-x-1/2 z-0 pointer-events-none"
      />
    </div>
  );
}
