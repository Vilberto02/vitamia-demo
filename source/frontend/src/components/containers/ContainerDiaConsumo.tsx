import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardRecipe } from "../cards/CardRecipe";
import { sampleRecipes } from "@/mocks/mocks";
import { useState } from "react";
import type { Recipe } from "@/types";
import { RecipeDetailSheet } from "../sheets/RecipeDetailSheet";

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
              <ScrollArea className="h-[480px] md:h-[648px]">
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

      <RecipeDetailSheet
        isOpen={open}
        setIsOpen={setOpen}
        selectedRecipe={selectedRecipe}
      ></RecipeDetailSheet>
    </div>
  );
}
