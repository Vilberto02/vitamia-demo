import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import type { Plan } from "@/types";
import { Plus, Route } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import Swal from "sweetalert2";

interface PlanDetailSheetProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPlan?: Plan;
  isUserPlan?: boolean;
}

export function PlanDetailSheet({
  isOpen,
  setOpen,
  selectedPlan,
  isUserPlan,
}: PlanDetailSheetProps) {
  const handleAddPlan = () => {
    Swal.fire({
      title: "Plan agregado con éxito",
      text: "El plan ha sido agregado a tu perfil.",
      icon: "success",
      confirmButtonColor: "#0D484E",
    });
    console.log("Plan agregado con éxito");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="p-9">
        {selectedPlan && (
          <>
            <SheetHeader>
              <SheetTitle className="text-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="w-24 aspect-square rounded-full shrink-0 bg-verde-isla flex justify-center items-center">
                    <Route className="text-white" size={40}></Route>
                  </div>
                  <p className="font-medium">{selectedPlan.title}</p>
                  <p className="font-normal text-gris-oscuro text-sm">
                    Este plan puede realizarse de forma indefinida.
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-84 lg:h-96 xl:h-[684px]">
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
                <p className="font-medium">Etiquetas</p>
                <ul className="text-gris-oscuro text-sm list-disc pl-5">
                  {selectedPlan.tags.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </ScrollArea>

            {!isUserPlan && (
              <Button
                className="mt-auto bg-turquesa hover:bg-turquesa/90 cursor-pointer flex justify-between py-3 px-4 items-center"
                onClick={handleAddPlan}
              >
                Agregar a mi perfil <Plus></Plus>
              </Button>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
