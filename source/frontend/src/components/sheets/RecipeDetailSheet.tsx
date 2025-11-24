import { MoveUpRight, Utensils } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import type { Recipe } from "@/types";
import { ScrollArea } from "../ui/scroll-area";

type RecipeDetailSheetProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRecipe: Recipe | null;
};

export function RecipeDetailSheet({
  isOpen,
  setIsOpen,
  selectedRecipe,
}: RecipeDetailSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="p-9">
        {selectedRecipe && (
          <>
            <SheetHeader>
              <SheetTitle className="text-center">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <div className="w-24 aspect-square rounded-full shrink-0 flex justify-center items-center bg-verde-isla">
                    <Utensils className="text-white" size={40}></Utensils>
                  </div>
                  <p className="font-medium">{selectedRecipe.title}</p>
                  <p className="font-normal text-gris-oscuro text-sm">
                    {selectedRecipe.preparationTime}
                  </p>
                </div>
              </SheetTitle>
            </SheetHeader>

            <ScrollArea className="h-84 lg:h-96 xl:h-[684px]">
              <div className="mt-4 space-y-2">
                <p className="font-medium">Descripción</p>
                <p className="text-gris-oscuro text-sm">
                  {selectedRecipe.description}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-medium">Beneficios</p>
                <p className="text-gris-oscuro text-sm">
                  {selectedRecipe.benefits}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-medium">Ingredientes</p>
                <ul className="text-gris-oscuro text-sm list-disc pl-5">
                  {selectedRecipe.ingredients?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-2">
                <p className="font-medium">Preparación</p>
                <ol className="text-gris-oscuro text-sm list-decimal pl-5">
                  {selectedRecipe.preparation?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ol>
              </div>
            </ScrollArea>

            <Button className="mt-auto bg-turquesa hover:bg-turquesa/90 cursor-pointer flex justify-between py-3 px-4 items-center">
              Agregar receta <MoveUpRight></MoveUpRight>
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
