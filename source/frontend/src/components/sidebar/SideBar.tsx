import { SidebarItem } from "./SideBarItem";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  items: Record<string, string>[];
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
  return (
    <aside
      className={`h-screen bg-[#FAFFF6]/60 w-64 flex flex-col items-center py-6 justify-between fixed top-0 left-0 z-40 
        transition-transform duration-300 ease-in-out ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
    >
      <div className="flex items-center flex-col gap-4 w-full px-4">
        <div className="font-extrabold text-2xl text-[var(--modeSecondary)] cursor-pointer">
          Vitamia
        </div>
        <nav className="flex-grow space-y-2 w-full">
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              name={item.name}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
            ></SidebarItem>
          ))}
        </nav>
      </div>
      <button
        onClick={() => {
          console.log("Cerrando sesión...");
          alert("Sesión cerrada.");
          navigate("/login");
        }}
        className="cursor-pointer hover:text-red-700 w-full"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
