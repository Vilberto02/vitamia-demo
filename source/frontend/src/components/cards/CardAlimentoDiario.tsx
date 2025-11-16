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
  Apple,
  Shrimp,
  Plus,
  List,
  type LucideIcon, // Importante
  Sandwich, // Un icono genérico para nuevos alimentos
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

// --- Definimos un tipo para nuestros alimentos ---
type Alimento = {
  id: number; // Necesario para el .map() y para eliminar
  name: string;
  Icon: LucideIcon; // Usamos el tipo de Icono
  cantidad: number;
  unidad: string;
};

// --- Props del componente ---
type CardAlimentoDiarioType = {
  name: string;
};

// Datos de ejemplo para empezar
const alimentosIniciales: Record<string, Alimento[]> = {
  Desayuno: [
    { id: 1, name: "Manzana", Icon: Apple, cantidad: 200, unidad: "Gramos" },
    { id: 2, name: "Atún", Icon: Shrimp, cantidad: 100, unidad: "Gramos" },
  ],
  Almuerzo: [
    { id: 3, name: "Manzana", Icon: Apple, cantidad: 150, unidad: "Gramos" },
  ],
  Cena: [],
  Snack: [],
};

export function CardAlimentoDiario({ name }: CardAlimentoDiarioType) {
  // --- ESTADOS ---

  // Estado para la lista de alimentos
  const [alimentos, setAlimentos] = useState<Alimento[]>(
    alimentosIniciales[name] || []
  );

  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para el modal
  const [open, setOpen] = useState(false);

  // Estados para los campos del formulario del modal
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState("");
  const [nuevaUnidad, setNuevaUnidad] = useState("Gramos");

  // --- HANDLERS (Funciones) ---

  // Lógica para "Vaciar alimentos"
  const handleVaciarAlimentos = () => {
    setAlimentos([]); // Vaciamos el array
    setIsEditing(false); // Salimos del modo edición si estábamos
  };

  // Lógica para "Editar alimentos"
  const handleToggleEditar = () => {
    setIsEditing(!isEditing); // Invierte el estado de edición
  };

  // Lógica para eliminar un item (se pasa al hijo)
  const handleEliminarAlimento = (idAEliminar: number) => {
    setAlimentos(alimentos.filter((alimento) => alimento.id !== idAEliminar));
  };

  // Lógica para agregar un alimento (desde el modal)
  const handleAgregarAlimento = () => {
    if (!nuevoNombre || !nuevaCantidad) return; // Validación simple

    const nuevoAlimento: Alimento = {
      id: Date.now(), // ID único simple usando la fecha
      name: nuevoNombre,
      Icon: Sandwich, // Usamos un ícono genérico
      cantidad: parseInt(nuevaCantidad, 10),
      unidad: nuevaUnidad,
    };

    setAlimentos([...alimentos, nuevoAlimento]);

    // Limpiar formulario y cerrar modal
    setNuevoNombre("");
    setNuevaCantidad("");
    setNuevaUnidad("Gramos");
    setOpen(false);
  };

  return (
    <div className="mb-4">
      {/* --- CABECERA CON TÍTULO Y OPCIONES --- */}
      <div className="flex justify-between items-center border-b-2 border-[var(--bg-gris-oscuro)]/20 pb-2 mb-2">
        <h3 className="font-medium select-none">{name}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="outline-none border-none text-[var(--bg-gris-oscuro)]/60 cursor-pointer">
              <EllipsisVertical />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel className="ml-2 mb-1 text-stone-500 text-sm">
              Opciones
            </DropdownMenuLabel>

            {/* OJO: Usamos 'onSelect' en lugar de 'onClick' para DropdownMenuItem */}
            <DropdownMenuItem
              className="flex justify-between items-center text-red-600 focus:text-white focus:bg-red-500"
              onSelect={handleVaciarAlimentos}
            >
              Vaciar alimentos <Trash2 className="h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex justify-between items-center"
              onSelect={handleToggleEditar}
            >
              {/* Cambia el texto si estamos editando */}
              {isEditing ? "Dejar de editar" : "Editar alimentos"}
              <SquarePen className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* --- LISTA DE ALIMENTOS (renderizada desde el estado) --- */}
      <div className="flex flex-col gap-2">
        {alimentos.map((alimento) => (
          <AlimentoDiarioItem
            key={alimento.id}
            name={alimento.name}
            Icon={alimento.Icon}
            cantidad={alimento.cantidad}
            unidad={alimento.unidad}
            isEditing={isEditing}
            onDelete={() => handleEliminarAlimento(alimento.id)}
          />
        ))}

        {/* Mensaje si no hay alimentos */}
        {alimentos.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No hay alimentos agregados.
          </p>
        )}
      </div>

      {/* --- BOTÓN Y MODAL (con lógica de estado) --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full border border-[var(--bg-turquesa)] text-[var(--bg-turquesa)] hover:text-[var(--bg-turquesa)] rounded-lg p-2 mt-4 flex items-center justify-center cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1" />
            Agregar alimento
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alimento</DialogTitle>
            <p className="text-sm text-gray-500 pt-2">
              Escribe los datos del alimento o ingrediente.
            </p>
          </DialogHeader>
          {/* Formulario conectado al estado */}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nombre">Nombre del alimento</Label>
              <Input
                id="nombre"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cantidad">Cantidad del alimento</Label>
              <Input
                id="cantidad"
                type="number"
                value={nuevaCantidad}
                onChange={(e) => setNuevaCantidad(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="unidad">Unidad del alimento</Label>
              <Input
                id="unidad"
                value={nuevaUnidad}
                onChange={(e) => setNuevaUnidad(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAgregarAlimento} // Llama a la función de agregar
              className="w-full bg-[#006A7A] hover:bg-[#005A6A] text-white"
            >
              <List className="h-4 w-4 mr-2" />
              Listo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
