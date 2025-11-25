import type { AlimentoInfo } from "@/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { HandPlatter, Info } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../Badge";

type FoodDetailSheetProps = {
  isOpen: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFood?: AlimentoInfo;
}

export function FoodDetailSheet({isOpen, setOpen, selectedFood}:FoodDetailSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="p-9">
        {selectedFood && (
          <>
            <SheetHeader>
              <SheetTitle className="text-center">
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div className="w-24 aspect-square rounded-full shrink-0 border-2 border-verde-te flex justify-center items-center">
                    <HandPlatter className="text-verde-isla" size={40}></HandPlatter>
                  </div>
                  <p className="font-medium">{selectedFood.name}</p>
                  <p className="font-normal text-gris-oscuro text-sm">
                    {selectedFood.calorias} Kcal
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-84 lg:h-96 xl:h-[684px]">
              <div className="mt-2  space-y-2 pr-3">
                <p className="font-medium">Macronutrientes</p>
                <p className="text-gris-oscuro text-sm">
                  Son los nutrientes que el cuerpo necesita en grandes
                  cantidades y que aportan energía.
                </p>
                <div className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
                  <Badge
                    title="Carbohidratos"
                    value={selectedFood.macronutrientes.carbohidratos.valor}
                  ></Badge>
                  <Badge
                    title="Proteínas"
                    value={selectedFood.macronutrientes.proteinas.valor}
                  ></Badge>
                  <Badge
                    title="Grasas"
                    value={selectedFood.macronutrientes.grasas.valor}
                  ></Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-medium">Micronutrientes</p>
                <p className="text-gris-oscuro text-sm">
                  Son nutrientes que se necesitan en pequeñas cantidades, pero
                  son esenciales para el funcionamiento del organismo.
                </p>
                <ScrollArea className="h-20 mt-4">
                  <div className="flex flex-col gap-3 pr-3">
                    {selectedFood.micronutrientes.map((micro) => (
                      <div
                        key={micro.id}
                        className="flex gap-4 py-1 justify-between items-center"
                      >
                        <p className="text-sm">{micro.name}</p>
                        <p className="text-sm font-medium">{micro.value}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <p className="flex items-center gap-1 text-left text-gris-oscuro text-xs mt-4 pr-3">
                  <Info width={18}></Info>
                  Son valores aproximados a la cantidad.
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-medium">Beneficios</p>
                <p className="text-gris-oscuro text-sm">
                  {selectedFood.beneficios}
                </p>
              </div>
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}