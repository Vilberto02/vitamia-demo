import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import type { Plan } from "@/types";
import { Plus } from "lucide-react";

interface PlanDetailSheetProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlan?: Plan;
}

export function PlanDetailSheet({
  isOpen,
  setOpen,
  selectedPlan,
}: PlanDetailSheetProps) {

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="p-9">
        {selectedPlan && (
          <>
            <SheetHeader>
              <SheetTitle className="text-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="w-28 aspect-square rounded-lg shrink-0 bg-verde-isla"></div>
                  <p className="font-medium">{selectedPlan.title}</p>
                  <p className="font-normal text-gris-oscuro">
                    Este plan puede realizarse de forma indefinida.
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-2">
              <p className="font-medium">Descripción</p>
              <p className="text-gris-oscuro text-sm">
                {selectedPlan.description}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-medium">Beneficios</p>
              <p className="text-gris-oscuro text-sm">
                {selectedPlan.benefits}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-medium">Ingredientes</p>
              <ul className="text-gris-oscuro text-sm list-disc pl-5">
                {selectedPlan.recipes?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 space-y-2">
              <p className="font-medium">Categorías</p>
              <ul className="text-gris-oscuro text-sm list-disc pl-5">
                {selectedPlan.tags.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <Button className="mt-auto bg-turquesa hover:bg-turquesa/90 cursor-pointer flex justify-between py-3 px-4 items-center">
              Agregar a mi perfil <Plus></Plus>
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
