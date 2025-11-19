import { recetasDesayuno } from "@/mocks/mocks";
import { CardRecetaItem } from "../cards/CardRecetaItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";

export function ContainerDiaConsumo() {
  return (
   
    <div className="flex flex-col gap-6 grow">
      <Tabs defaultValue="desayuno">
        <TabsList>
          <TabsTrigger value="desayuno">Desayuno</TabsTrigger>
          <TabsTrigger value="almuerzo">Almuerzo</TabsTrigger>
          <TabsTrigger value="cena">Cena</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>

        
        <TabsContent value="desayuno" className="h-[500px]">

          <ScrollArea className="h-full pr-3">
            {recetasDesayuno.map((receta) => (
              <CardRecetaItem
                key={receta.id}
                title={receta.title}
                description={receta.description}
              ></CardRecetaItem>
            ))}
          </ScrollArea>
        </TabsContent>

        
        <TabsContent value="almuerzo" className="h-[500px]">
          <ScrollArea className="h-full pr-3">
            {recetasDesayuno.map((receta) => (
              <CardRecetaItem
                key={receta.id}
                title={receta.title}
                description={receta.description}
              ></CardRecetaItem>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="cena" className="h-[500px]">
          <ScrollArea className="h-full pr-3">
            {recetasDesayuno.map((receta) => (
              <CardRecetaItem
                key={receta.id}
                title={receta.title}
              description={receta.description}
              ></CardRecetaItem>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="snacks" className="h-[500px]">
          <ScrollArea className="h-full pr-3">
            {recetasDesayuno.map((receta) => (
              <CardRecetaItem
                key={receta.id}
                title={receta.title}
                description={receta.description}
              ></CardRecetaItem>
          ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}