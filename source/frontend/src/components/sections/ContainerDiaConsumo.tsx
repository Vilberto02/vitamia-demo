import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardRecipe } from "../cards/CardRecipe";
import { sampleRecipes } from "@/mocks/mocks";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import type { Recipe } from "@/types";
import { Button } from "../ui/button";
import {MoveUpRight} from "lucide-react"

export function ContainerDiaConsumo() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };

  return (
    <div className="flex w-full h-full flex-col gap-6">
      <Tabs defaultValue="desayuno" className="">
        <TabsList>
          <TabsTrigger value="desayuno" className="select-none">
            Desayuno
          </TabsTrigger>
          <TabsTrigger value="almuerzo" className="select-none">
            Almuerzo
          </TabsTrigger>
          <TabsTrigger value="cena" className="select-none">
            Cena
          </TabsTrigger>
          <TabsTrigger value="snacks" className="select-none">
            Snacks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="desayuno" className="">
          <Card className="">
            <CardContent className="">
              <ScrollArea className="h-[648px]">
                <div className="flex flex-col gap-3 pr-3">
                  {sampleRecipes.map((recipe) => (
                    <CardRecipe
                      key={recipe.id}
                      title={recipe.title}
                      description={recipe.description}
                      onClick={() => handleSelectRecipe(recipe)}
                    ></CardRecipe>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="almuerzo">
          <Card className="">
            <CardContent className="">
              <ScrollArea className="h-[648px]">
                <div className="flex flex-col gap-3 pr-3">
                  {[...sampleRecipes]
                    .sort((a, b) => parseInt(b.id) - parseInt(a.id)) // Orden por título
                    .map((recipe) => (
                      <CardRecipe
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        onClick={() => handleSelectRecipe(recipe)}
                      />
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cena">
          <Card className="">
            <CardContent className="">
              <ScrollArea className="h-[648px]">
                <div className="flex flex-col gap-3 pr-3">
                  {[...sampleRecipes]
                    .sort((a, b) => a.title.localeCompare(b.title)) // Ordenar por título
                    .map((recipe) => (
                      <CardRecipe
                        key={recipe.id}
                        title={recipe.title}
                        description={recipe.description}
                        onClick={() => handleSelectRecipe(recipe)}
                      />
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="snacks">
          <Card className="">
            <CardContent className="">
              <ScrollArea className="h-[648px]">
                <div className="flex flex-col gap-3 pr-3">
                  {sampleRecipes.map((recipe) => (
                    <CardRecipe
                      key={recipe.id}
                      title={recipe.title}
                      description={recipe.description}
                      onClick={() => handleSelectRecipe(recipe)}
                    ></CardRecipe>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="p-9">
          {selectedRecipe && (
            <>
              <SheetHeader>
                <SheetTitle className="text-center">
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="w-28 aspect-square rounded-lg shrink-0 bg-verde-isla"></div>
                    <p className="font-medium">{selectedRecipe.title}</p>
                    <p className="font-normal text-gris-oscuro">
                      {selectedRecipe.preparationTime}
                    </p>
                  </div>
                </SheetTitle>
              </SheetHeader>

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

              <Button className="mt-auto bg-turquesa hover:bg-turquesa/90 cursor-pointer flex justify-between py-3 px-4 items-center">
                Agregar receta <MoveUpRight></MoveUpRight>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
