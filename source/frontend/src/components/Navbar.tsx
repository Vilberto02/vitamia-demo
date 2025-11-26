import { useAuth } from "@/hooks/useAuth";
import { CircleUserRound, Menu } from "lucide-react";

export function Navbar({
  setActiveItem,
  toggleSidebar,
}: {
  setActiveItem: (id: string) => void;
  toggleSidebar: () => void;
}) {
  const {user} = useAuth();
  return (
    <header className="bg-[#FAFFF6]/60 flex justify-between items-center py-2 px-2 md:px-8 text-carbon-oscuro rounded-xl">
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
        <CircleUserRound width={32} height={32}></CircleUserRound>
        <div>
          <p className="select-none font-medium text-base text-left">
            {user?.nombre}, {user?.apellido}
          </p>
          <p className="font-normal text-xs text-gris-oscuro">{user?.correo}</p>
        </div>
      </button>
    </header>
  );
}
