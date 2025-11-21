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
      <Menu
        className="cursor-pointer select-none"
        onClick={toggleSidebar}
      ></Menu>
      <nav
        className="inline-flex gap-3 items-center justify-center p-2 cursor-pointer"
        onClick={() => setActiveItem("perfil")}
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
      </nav>
    </header>
  );
}
