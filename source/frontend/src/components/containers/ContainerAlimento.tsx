import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardAlimentoDiario } from "../cards/CardAlimentoDiario";
import { GlassWater, Minus, Plus } from "lucide-react";

// --- ¡NUEVO! Definimos las props que recibirá ---
type ContainerAlimentoProps = {
  onAddWater: () => void;
  onRemoveWater: () => void;
};

// --- ¡ACTUALIZADO! Recibimos las props aquí ---
export function ContainerAlimento({
  onAddWater,
  onRemoveWater,
}: ContainerAlimentoProps) {
  return (
    <>
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Alimentos ingeridos</CardTitle>
          <CardDescription>
            {" "}
            Aquí agregas los alimentos que ingieres en tu día.
          </CardDescription>
          <CardAction>
            <div className="flex gap-2">
              {/* --- ¡ACTUALIZADO! Añadimos onClick --- */}
              <button
                className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer"
                onClick={onAddWater}
              >
                <Plus></Plus>
              </button>

              <button className="p-2" disabled>
                {" "}
                {/* Lo dejamos deshabilitado */}
                <GlassWater></GlassWater>
              </button>

              {/* --- ¡ACTUALIZADO! Añadimos onClick --- */}
              <button
                className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer"
                onClick={onRemoveWater}
              >
                <Minus></Minus>
              </button>

              {/* Se eliminó el '*' que causaba un error de sintaxis */}
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
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
