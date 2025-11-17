import { Zap, Shrimp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AlimentoDiarioItem } from "../cards/AlimentoDiarioItem";
import { ScrollArea } from "../ui/scroll-area";

export function ContainerPersonalizarComida() {
  return (
    <>
           {" "}
      <Card>
               {" "}
        <CardHeader>
                    <CardTitle>Personalizar Comida</CardTitle>         {" "}
          <CardDescription>
                        Aquí podrás personalizar tus comidas          {" "}
          </CardDescription>
                 {" "}
        </CardHeader>
        {/* --- CAMBIO RESPONSIVE AQUÍ --- */}
        {/* Cambiamos 'h-full' por una altura fija, por ejemplo 'h-[300px]'.
          Esto le da al área de scroll un tamaño predecible y funciona
          perfectamente en cualquier tamaño de pantalla (móvil o escritorio).
        */}
               {" "}
        <CardContent className="h-[300px]">
          {/* Y le decimos al ScrollArea que ocupe el 100% de la altura
          de su padre (los 300px que acabamos de definir).
        */}
                   {" "}
          <ScrollArea className="h-full pr-3">
                       {" "}
            <AlimentoDiarioItem
              name="Fideos"
              Icon={Shrimp}
              cantidad={150}
              unidad="g"
              isEditing={false}
              onDelete={() => {}}
            ></AlimentoDiarioItem>
            {/* Si agregas más items, ahora aparecerá el scroll */}         {" "}
          </ScrollArea>
                 {" "}
        </CardContent>
        {/* --- FIN DEL CAMBIO --- */}       {" "}
        <CardFooter>
                   {" "}
          <Button className="flex gap-2 items-center bg-[var(--bg-turquesa)] w-full">
                        <Zap></Zap> Consultar          {" "}
          </Button>
                 {" "}
        </CardFooter>
             {" "}
      </Card>
         {" "}
    </>
  );
}
