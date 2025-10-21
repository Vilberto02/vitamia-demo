import { Zap, Shrimp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AlimentoDiarioItem } from "../cards/AlimentoDiarioItem";
import { ScrollArea } from "../ui/scroll-area";

export function ContainerPersonalizarComida() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personalizar Comida</CardTitle>
          <CardDescription>
            Aquí podrás personalizar tus comidas
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          <ScrollArea>
            <AlimentoDiarioItem
              name="Fideos"
              Icon={Shrimp}
            ></AlimentoDiarioItem>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button className="flex gap-2 items-center bg-[var(--bg-turquesa)] w-full">
            <Zap></Zap> Consultar
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}