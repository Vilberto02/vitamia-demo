import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { EllipsisVertical, SquarePen, Trash2, Apple, Shrimp, Plus } from "lucide-react";
import { AlimentoDiarioItem } from "./AlimentoDiarioItem";
import { Button } from "../ui/button";

type CardAlimentoDiarioType = {
  name: string;
}

export function CardAlimentoDiario({ name }: CardAlimentoDiarioType) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center border-b-2 border-[var(--bg-gris-oscuro)]/20 pb-2 mb-2">
        <h3 className="font-medium select-none">{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none border-none text-[var(--bg-gris-oscuro)]/60">
              <EllipsisVertical></EllipsisVertical>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel className="ml-1 mb-1 text-stone-500 text-sm">Opciones</DropdownMenuLabel>
            <DropdownMenuItem className="flex justify-between items-center">
              Vaciar alimentos <Trash2></Trash2>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between items-center">
              Editar alimentos <SquarePen></SquarePen>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlimentoDiarioItem name="Manzana" Icon={Apple}></AlimentoDiarioItem>
      <AlimentoDiarioItem name="Atún" Icon={Shrimp}></AlimentoDiarioItem>
      <Button
        variant={"outline"}
        className="w-full border border-[var(--bg-turquesa)] text-[var(--bg-turquesa)] hover:text-[var(--bg-turquesa)] rounded-lg p-2 mt-4 flex items-center justify-center cursor-pointer"
      >
        <Plus></Plus>
        Agregar alimento
      </Button>
    </div>
  );
}