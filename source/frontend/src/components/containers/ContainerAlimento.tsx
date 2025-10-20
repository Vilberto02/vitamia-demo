import { GlassWater, Minus, Plus } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardAlimentoDiario } from "../cards/CardAlimentoDiario";

export function ContainerAlimento() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Alimentos ingeridos</CardTitle>
          <CardDescription>
            {" "}
            Aquí agregas los alimentos que ingieres en tu día.
          </CardDescription>
          <CardAction>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer">
                <Plus></Plus>
              </button>
              <button className="p-2">
                <GlassWater></GlassWater>
              </button>
              <button className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer">
                <Minus></Minus>
              </button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* Alimentos */}
          <ScrollArea className="h-[448px] w-full rounded-md flex flex-col gap-8 px-2">
            <CardAlimentoDiario name="Desayuno"></CardAlimentoDiario>
            <CardAlimentoDiario name="Almuerzo"></CardAlimentoDiario>
            <CardAlimentoDiario name="Cena"></CardAlimentoDiario>
            <CardAlimentoDiario name="Snack"></CardAlimentoDiario>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}