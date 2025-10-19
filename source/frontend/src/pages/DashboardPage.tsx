import { useState } from "react";
import { RecipeSection } from "../components/sections/RecipeSection";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PlanSection } from "../components/sections/PlanSection";
import { SideBar } from "../components/sidebar/SideBar";
import { Navbar } from "../components/Navbar";
import { ProfilePage } from "../components/sections/ProfileSection";
import { ChartNoAxesColumn, UserRound, Grid2X2, Salad} from "lucide-react";
import type { SideBarItemType } from "@/types";


const sidebarItems: SideBarItemType[] = [
  { id: "general", name: "General", Icon: ChartNoAxesColumn },
  { id: "recetas", name: "Recetas", Icon: Salad },
  { id: "planes", name: "Planes", Icon: Grid2X2 },
  { id: "perfil", name: "Perfil", Icon: UserRound },
];

const sections: Record<string, React.ReactNode> = {
  general: <OverviewSection></OverviewSection>,
  recetas: <RecipeSection></RecipeSection>,
  planes: <PlanSection></PlanSection>,
  perfil: <ProfilePage></ProfilePage>,
};

export const DashboardPage = () => {
  const [activeItem, setActiveItem] = useState("general");
  const [isSidebarOpen, setIsSiderOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSiderOpen(!isSidebarOpen);
  };

  return (
    <div className="flex gap-3 w-screen h-screen">
      <SideBar
        items={sidebarItems}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        isOpen={isSidebarOpen}
      ></SideBar>
      <div
        className={`flex flex-col gap-3 w-full ${
          isSidebarOpen ? "ml-[264px]" : "ml-0"
        }`}
      >
        <Navbar
          setActiveItem={setActiveItem}
          toggleSidebar={toggleSidebar}
        ></Navbar>
        <main className="flex-1 p-10 bg-[#FAFFF6]/60 rounded-xl overflow-hidden">
          {sections[activeItem]}
        </main>
      </div>
    </div>
  );
};
