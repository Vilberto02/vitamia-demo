import { type LucideIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ItemProps = {
  // Props que ya tenías
  name: string;
  Icon: LucideIcon;

  // Nuevas props para mostrar datos del estado
  cantidad: number;
  unidad: string;
  isEditing: boolean; // ¿Estamos en modo edición?
  onDelete: () => void; // Función para eliminar este item
};

export function AlimentoDiarioItem({
  name,
  Icon,
  cantidad,
  unidad,
  isEditing,
  onDelete,
}: ItemProps) {
  return (
    // Animación simple para cuando se agrega/elimina
    <div className="flex items-center gap-2 p-2 border rounded-lg animate-in fade-in-0 slide-in-from-top-2 duration-300">
      {/* Icono y Nombre */}
      <div className="flex items-center gap-2 flex-1">
        <div className="p-2 bg-gray-100 rounded-full">
          <Icon className="h-5 w-5 text-gray-700" />
        </div>
        <span className="font-medium">{name}</span>
      </div>

      {/* Inputs de Cantidad y Unidad (como en tus imágenes) */}
      <Input
        type="number"
        defaultValue={cantidad}
        className="w-20 text-right"
        readOnly={!isEditing} // Solo se puede editar en "modo edición"
      />
      <Input defaultValue={unidad} className="w-24" readOnly={!isEditing} />

      {/* Botón de Eliminar (Solo aparece en modo edición) */}
      {isEditing && (
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          className="ml-2"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
