import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Un tipo 'Plan' más completo (debes añadir estos datos a tu 'listaDePlanes')
interface Plan {
  id: number;
  titulo: string;
  descripcion: string;
  tags: readonly string[];
  beneficios?: { texto: string }[];
  recetas?: {
    desayuno: string[];
    almuerzo: string[];
    cena: string[];
  };
}

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
  if (!plan) return null; // No renderizar nada si no hay plan seleccionado

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <div className="w-20 h-20 bg-green-500 rounded-lg mb-4"></div>{" "}
          {/* Cuadro verde */}
          <SheetTitle className="text-2xl">{plan.titulo}</SheetTitle>
          <SheetDescription>{plan.descripcion}</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 my-4 pr-6">
          <div className="space-y-4">
            {/* Beneficios */}
            {plan.beneficios && (
              <div>
                <h4 className="font-semibold mb-2">Beneficios</h4>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-500">ℹ️</span>
                  <p className="text-sm text-blue-700">
                    {plan.beneficios[0].texto}
                  </p>
                </div>
              </div>
            )}

            {/* Recetas */}
            {plan.recetas && (
              <div>
                <h4 className="font-semibold mb-2">Recetas</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium">Desayuno</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {plan.recetas.desayuno.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Almuerzo</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {plan.recetas.almuerzo.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Cena</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {plan.recetas.cena.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <SheetFooter>
          <Button
            onClick={onAddPlan}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            Añadir plan a mi perfil
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
