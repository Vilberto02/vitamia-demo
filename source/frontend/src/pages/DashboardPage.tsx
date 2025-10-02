import { useState } from "react";
import { RecipeSection } from "../components/sections/RecipeSection";
import { OverviewSection } from "../components/sections/OverviewSection";
import { PlanSection } from "../components/sections/PlanSection";
import { SideBar } from "../components/sidebar/SideBar";
import { Navbar } from "../components/Navbar";
import { ProfilePage } from "../components/sections/ProfileSection";

const sidebarItems: Record<string, string>[] = [
  { id: "general", name: "General" },
  { id: "recetas", name: "Recetas" },
  { id: "planes", name: "Planes" },
  { id: "perfil", name: "Perfil" },
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
        <main className="flex-1 p-10 bg-[#FAFFF6]/60 rounded-xl">
          {sections[activeItem]}
        </main>
      </div>
    </div>
  );
};
