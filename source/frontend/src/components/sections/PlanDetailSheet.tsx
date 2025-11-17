import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type Plan = {
  id: number;
  titulo: string;
  descripcion: string;
  beneficios: { texto: string }[];
  recetas: {
    desayuno: string[];
    almuerzo: string[];
    cena: string[];
  };
};

interface PlanDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlan: () => void;
  plan: Plan | null;
}

export function PlanDetailSheet({
  isOpen,
  onClose,
  onAddPlan,
  plan,
}: PlanDetailSheetProps) {
  if (!plan) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        {/* --- CAMBIOS AQUÍ EN EL SheetHeader --- */}
        <SheetHeader className="text-center">
          {" "}
          {/* Añade 'text-center' */}
          <div className="w-20 h-20 bg-green-500 rounded-lg mx-auto mb-4"></div>{" "}
          {/* Añade 'mx-auto' para centrar */}
          <SheetTitle className="text-2xl">{plan.titulo}</SheetTitle>
          <SheetDescription>{plan.descripcion}</SheetDescription>
        </SheetHeader>
        {/* --- FIN CAMBIOS EN SheetHeader --- */}

        <ScrollArea className="flex-1 my-4 px-6">
          {" "}
          {/* Cambia 'pr-6' por 'px-6' para padding horizontal */}
          <div className="space-y-6">
            {" "}
            {/* Aumenta el 'space-y' para más separación entre secciones */}
            {/* Beneficios */}
            <div>
              <h4 className="font-semibold mb-2 text-center">Beneficios</h4>{" "}
              {/* Añade 'text-center' */}
              {/* Ajusta este div para que el icono y texto se centren si es necesario */}
              <div className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-lg text-center">
                <span className="text-blue-500">ℹ️</span>
                <p className="text-sm text-blue-700">
                  {plan.beneficios[0].texto}
                </p>
              </div>
            </div>
            {/* Recetas */}
            <div>
              <h4 className="font-semibold mb-2 text-center">Recetas</h4>{" "}
              {/* Añade 'text-center' */}
              <div className="space-y-3">
                {/* Estos divs se pueden centrar manualmente si se desea,
                    pero usualmente las listas se dejan alineadas a la izquierda.
                    Si quieres centrar los títulos de Desayuno, Almuerzo, Cena,
                    añade 'text-center' a los h5.
                */}
                <div>
                  <h5 className="font-medium">Desayuno</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                    {" "}
                    {/* Añade 'pl-4' para indentación */}
                    {plan.recetas.desayuno.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium">Almuerzo</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                    {plan.recetas.almuerzo.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium">Cena</h5>
                  <ul className="list-disc list-inside text-sm text-gray-600 pl-4">
                    {plan.recetas.cena.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter>
          <Button
            onClick={onAddPlan}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          >
            Añadir plan a mi perfil
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
