import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { ContainerProgresoGeneral } from "../containers/ContainerProgresoGeneral";
import { ContainerProgresoPeso } from "../containers/ContainerProgresoPeso";
import { ContainerPreferencias } from "../containers/ContainerPreferencias";
import { ContainerMisLogros } from "../containers/ContainerMisLogros";
import { ContainerMisPlanes } from "../containers/ContainerMisPlanes";
import { useAuth } from "@/hooks/useAuth";

export function ProfileOverview({ onEdit }: { onEdit: () => void }) {
  const {user} = useAuth();
  return (
    <div className="flex flex-col gap-5 h-full animate-in fade-in slide-in-from-left-4 duration-500 pb-8 xl:pb-0 xl:mb-0 overflow-y-hidden px-2">
      <h1 className="font-bold text-2xl text-carbon-oscuro select-none">
        Perfil
      </h1>

      <div className="w-full h-full flex flex-col gap-6 pb-4 ">
        <div className="bg-white shadow-sm rounded-2xl flex flex-col md:flex-row gap-6 items-center py-4 px-5 justify-between">
          <div className="flex gap-4 self-start items-center">
            <div className="bg-verde-isla rounded-full w-12 h-12 aspect-square flex items-center justify-center">
              <p className="text-white text-xl font-medium">
                {user?.nombre.charAt(0).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-carbon-oscuro font-semibold text-base">
                {user?.nombre}, {user?.apellido}
              </p>
              <p className="text-gris-oscuro text-sm">{user?.correo}</p>
            </div>
          </div>
          <Button
            variant={"outline"}
            className="cursor-pointer gap-2 w-full md:w-auto"
            onClick={onEdit}
          >
            Editar <Pencil className="w-4 h-4" />
          </Button>
        </div>

        {/* Contenedores */}
        <div className="flex flex-col xl:grid xl:grid-cols-3 xl:grid-rows-2 gap-5 w-full h-full overflow-y-auto pb-4">
          <ContainerProgresoGeneral />
          <ContainerMisLogros />
          <ContainerProgresoPeso />
          <ContainerPreferencias />
          <ContainerMisPlanes />
        </div>
      </div>
    </div>
  );
}

/*

{/* Contenedores 
        <div className="flex flex-col xl:flex-row gap-5 w-full h-full overflow-y-auto pb-6">
          <div className="flex flex-col gap-5 w-full h-full">
            <ContainerProgresoGeneral />
            <div className="flex flex-col h-full xl:flex-row gap-6">
              <ContainerProgresoPeso />
              <ContainerPreferencias />
            </div>
          </div>

          <div className="min-w-1/4 flex flex-col gap-5">
            <ContainerMisLogros />
            <ContainerMisPlanes />
          </div>
        </div>

*/
