import { CircleUserRound, Menu } from "lucide-react";

export function Navbar({
  setActiveItem,
  toggleSidebar,
}: {
  setActiveItem: (id: string) => void;
  toggleSidebar: () => void;
}) {
  return (
    <header className="bg-[#FAFFF6]/60 flex justify-between items-center py-2 px-8 text-[var(--bg-carbon-oscuro)] rounded-xl">
      <button
        type="button"
        aria-label="Abrir o cerrar menú de navegación"
        className="cursor-pointer select-none border-none bg-transparent p-2"
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
      <button
        type="button"
        onClick={() => setActiveItem("perfil")}
        aria-label="Ver perfil de usuario"
        className="inline-flex gap-3 items-center justify-center p-2 cursor-pointer border-none bg-transparent hover:bg-stone-100 rounded-lg transition-colors"
      >
        <CircleUserRound width={32} height={32} ></CircleUserRound>
        <div>
          <p className="select-none font-medium text-base">
            Juan, Perez Morales
          </p>
          <p className="font-normal text-xs text-[var(--bg-gris-oscuro)]">
            juan.perez@unmsm.edu.pe
          </p>
        </div>
      </button>
    </header>
  );
}
