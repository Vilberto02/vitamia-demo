import { type LucideIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getUnidadById, unidadesMedida, type unidadMedida } from "./CardAlimentoDiario";
import { useEffect, useState } from "react";

type AlimentoItemProps = {
  name: string;
  Icon: LucideIcon;
  cantidad: number;
  unidad: unidadMedida;
  isEditing: boolean;
  onDelete: () => void;
  setActualizarUnidad: React.Dispatch<
    React.SetStateAction<unidadMedida>
  >;
};

export function AlimentoDiarioItem({
  name,
  Icon,
  cantidad,
  unidad,
  isEditing,
  onDelete,
  setActualizarUnidad
}: AlimentoItemProps) {
  const [unidadLocal, setUnidadLocal] = useState<unidadMedida>(unidad);

  // sincroniza cuando cambia la prop inicial
  useEffect(() => {
    setUnidadLocal(unidad);
  }, [unidad]);

  return (
    <div className="flex flex-col items-start xl:flex-row xl:items-center gap-2 p-2 border rounded-lg animate-in fade-in-0 slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-2 flex-1">
        <div className="p-2 bg-gray-100 rounded-full">
          <Icon className="h-5 w-5 text-gray-700" />
        </div>
        <span className="font-medium select-none">{name}</span>
      </div>

      <div className="flex gap-2 w-full xl:w-64">
        <Input
          type="number"
          defaultValue={cantidad}
          className="w-20 text-center flex-1"
          disabled={!isEditing}
        />

        <Select
          value={unidadLocal.id}
          disabled={!isEditing}
          onValueChange={(value) => {
            const nueva = getUnidadById(value);
            setUnidadLocal(nueva);
            setActualizarUnidad(nueva);
          }}
        >
          <SelectTrigger className="w-44 flex-1 xl:flex-none">
            <SelectValue placeholder="Gramos" id="unidad" />
          </SelectTrigger>
          <SelectContent>
            {unidadesMedida.map((unidad) => (
              <SelectItem key={unidad.id} value={unidad.id}>
                {unidad.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Botón de Eliminar (Solo aparece en modo edición) */}
      {isEditing && (
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          className=" cursor-pointer w-full xl:w-12"
        >
          <p className="block xl:hidden">Eliminar</p>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
