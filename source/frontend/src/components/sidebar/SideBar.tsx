import type { SideBarItemType } from "@/types";
import { SidebarItem } from "./SideBarItem";
import { useNavigate } from "react-router-dom";
import Vitamia from "@/assets/vitamia-logo.svg";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";

type SidebarProps = {
  items: SideBarItemType[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  isOpen: boolean;
};

export function SideBar({
  items,
  activeItem,
  setActiveItem,
  isOpen,
}: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <aside
      aria-label="Navegación principal"
      aria-hidden={!isOpen}
      className={`h-screen bg-[#FAFFF6]/60 w-64 flex flex-col items-center py-6 justify-between fixed top-0 left-0 z-40 
        transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
    >
      <div className="flex items-center flex-col gap-4 w-full px-4">
        <button
          type="button"
          onClick={() => setActiveItem("general")}
          aria-label="Ir a inicio"
          className="w-36 py-3 cursor-pointer border-none bg-transparent"
        >
          <img src={Vitamia} alt="Logo de Vitamia" className="w-full" />
        </button>
        <nav
          aria-label="Menú de navegación principal"
          className="flex-grow space-y-2 w-full"
        >
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              name={item.name}
              Icon={item.Icon}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            ></SidebarItem>
          ))}
        </nav>
      </div>
      <button
        type="button"
        onClick={() => {
          Swal.fire({
            icon: "success",
            title: "Sesión cerrada.",
            text: "Hasta pronto.",
            confirmButtonColor: "#177e89",
          });
          logout();
          navigate("/");
        }}
        aria-label="Cerrar sesión"
        className="cursor-pointer hover:text-red-700 w-full"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
