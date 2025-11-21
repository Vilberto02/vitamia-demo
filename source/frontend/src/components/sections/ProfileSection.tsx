import { Eye, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { ContainerProgresoGeneral } from "../containers/ContainerProgresoGeneral";
import { ContainerProgresoPeso } from "../containers/ContainerProgresoPeso";
import { ContainerPreferencias } from "../containers/ContainerPreferencias";
import { ContainerMisPlanes } from "../containers/ContainerMisPlanes";
import { ContainerMisLogros } from "../containers/ContainerMisLogros";

export function ProfilePage() {
  return (
    <section className="flex flex-col gap-6 h-full">
      <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
        Perfil
      </h1>
      <div className=" w-full h-full flex flex-col gap-6">
        {/* Sección de perfil - Datos */}
        <div className="bg-white shadow-sm rounded-2xl flex items-center py-4 px-5 justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-verde-isla rounded-full w-14 h-14 aspect-square"></div>
            <div>
              <p className="text-carbon-oscuro font-semibold text-lg">
                Juan, Perez Morales
              </p>
              <p className="text-gris-oscuro">juan.perez@unmsm.edu.pe</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={"ghost"} className="cursor-pointer">
              Ver datos <Eye></Eye>{" "}
            </Button>
            <Button variant={"outline"} className="cursor-pointer">
              Editar <Pencil></Pencil>{" "}
            </Button>
          </div>
        </div>
        {/* Sección */}
        <div className="flex gap-6 w-full h-full">
          <div className="flex flex-col gap-6 w-full">
            <ContainerProgresoGeneral></ContainerProgresoGeneral>
            <div className="flex gap-6">
              <ContainerProgresoPeso></ContainerProgresoPeso>
              <ContainerPreferencias></ContainerPreferencias>
            </div>
          </div>

          <div className="min-w-1/4 flex flex-col gap-6">
            <ContainerMisLogros></ContainerMisLogros>
            <ContainerMisPlanes></ContainerMisPlanes>
          </div>
        </div>
      </div>
    </section>
  );
}
