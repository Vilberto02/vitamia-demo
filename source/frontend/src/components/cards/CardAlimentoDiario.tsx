import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import {
  EllipsisVertical,
  SquarePen,
  Trash2,
  Plus,
  CheckCheck,
} from "lucide-react";
import { AlimentoDiarioItem } from "./AlimentoDiarioItem";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ScrollArea } from "../ui/scroll-area";
import { alimentosIniciales } from "@/mocks/mocks";
import type { Alimento, unidadMedida } from "@/types";
import { getUnidadById } from "@/lib/utils";
import { unidadesMedida } from "@/lib/constants";

type CardAlimentoDiarioType = {
  name: string;
};

export function CardAlimentoDiario({ name }: CardAlimentoDiarioType) {
  const [alimentos, setAlimentos] = useState<Alimento[]>(
    alimentosIniciales[name] || []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [nuevaUnidad, setNuevaUnidad] = useState<unidadMedida>(
    getUnidadById("Gramos")
  );

  // Vaciar alimentos
  const handleVaciarAlimentos = () => {
    setAlimentos([]);
    setIsEditing(false);
  };

  // Editar alimentos
  const handleToggleEditar = () => {
    setIsEditing(!isEditing);
  };

  // Eliminar un item (se pasa al hijo)
  const handleEliminarAlimento = (idAEliminar: number) => {
    setAlimentos(alimentos.filter((alimento) => alimento.id !== idAEliminar));
  };

  // Agregar un alimento (desde el modal)
  const handleAgregarAlimento = () => {
    if (!nuevoNombre || !nuevaCantidad) return;

    const nuevoAlimento: Alimento = {
      id: Date.now(), // ID único simple usando la fecha
      name: nuevoNombre,
      cantidad: parseInt(nuevaCantidad, 10),
      unidad: nuevaUnidad,
    };

    setAlimentos([...alimentos, nuevoAlimento]);

    // Limpiar formulario y cerrar modal
    Swal.fire({
      title: "Alimento agregado",
      text: "El alimento se agregó correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0D484E",
    });
    setNuevoNombre("");
    setNuevaCantidad("");
    setNuevaUnidad({ id: "", name: "" });
    setOpen(false);
  };

  const verificarAlimentos = () => {
    if (alimentos.length === 0) {
      toast.error("No hay alimentos registrados.");
      return;
    }
  };

  return (
    <div className="mb-12 flex flex-col h-full w-full">
      <div className="flex justify-between items-center border-b-2 border-gris-oscuro/20 pb-2 mb-2">
        <h3 className="font-medium select-none">{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="pr-1">
            <button className="outline-none border-none text-gris-oscuro/60 cursor-pointer">
              <EllipsisVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 text-gris-oscuro" align="start">
            <DropdownMenuLabel className="ml-2 mb-1 text-gris-oscuro/40 text-sm">
              Opciones
            </DropdownMenuLabel>

            {/* OJO: Usamos 'onSelect' en lugar de 'onClick' para DropdownMenuItem */}
            <DropdownMenuItem
              className="flex justify-between items-center text-stone-600 focus:text-red-500 focus:bg-stone-50"
              onSelect={() => {
                verificarAlimentos();
                handleVaciarAlimentos();
              }}
            >
              Vaciar alimentos{" "}
              <Trash2 className="h-4 w-4 focus:text-red-500 " />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex justify-between items-center "
              onSelect={() => {
                verificarAlimentos();
                handleToggleEditar();
              }}
            >
              {isEditing ? "Guardar y salir" : "Editar alimentos"}
              <SquarePen className="h-4 w-4 focus:text-black" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- LISTA DE ALIMENTOS (renderizada desde el estado) --- */}
      <div className="flex flex-col h-full">
        {/* Mensaje si no hay alimentos */}
        {alimentos.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay alimentos agregados.
          </p>
        ) : (
          <ScrollArea className="h-52">
            <div className="flex flex-col gap-2 px-3">
              {alimentos.map((alimento) => (
                <AlimentoDiarioItem
                  key={alimento.id}
                  name={alimento.name}
                  cantidad={alimento.cantidad}
                  unidad={getUnidadById(alimento.unidad.id)}
                  isEditing={isEditing}
                  onDelete={() => handleEliminarAlimento(alimento.id)}
                  setActualizarUnidad={setNuevaUnidad}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* --- Modal de agregar alimento --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="px-3">
            <Button
              variant={"outline"}
              className="w-full border border-turquesa text-turquesa hover:text-turquesa rounded-lg py-2 px-4 mt-4 flex items-center justify-center cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar alimento
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alimento</DialogTitle>
            <p className="text-sm text-gray-500 pt-2">
              Escribe los datos del alimento o ingrediente.
            </p>
          </DialogHeader>
          {/* Agregar alimento */}
          <form className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre">Nombre del alimento</Label>
              <Input
                id="nombre"
                value={nuevoNombre}
                placeholder="Fideos"
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cantidad">Cantidad del alimento</Label>
              <Input
                id="cantidad"
                type="number"
                placeholder="100"
                value={nuevaCantidad}
                onChange={(e) => setNuevaCantidad(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="unidad">Unidad del alimento</Label>
              <Select
                onValueChange={(value) => setNuevaUnidad(getUnidadById(value))}
              >
                <SelectTrigger className="w-full">
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
          </form>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAgregarAlimento}
              className="w-full bg-[#006A7A] hover:bg-[#005A6A] text-white cursor-pointer"
            >
              <CheckCheck className="h-4 w-4 mr-2" />
              Listo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
