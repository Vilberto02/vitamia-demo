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
import toast, { Toaster } from "react-hot-toast";

export function ContainerAlimento() {
  const addWater = () => {
    toast.success("Tu consumo de agua aumentó.");
  };

  const removeWater = () => {
    toast.success("Tu consumo de agua disminuyó.");
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="grow w-full">
        <CardHeader>
          <CardTitle>Alimentos ingeridos</CardTitle>
          <CardDescription>
            Aquí agregas los alimentos que ingieres en tu día.
          </CardDescription>
          <CardAction>
            {/*Agregar/Reducir vasos de agua */}
            <div className="flex gap-2">
              <button
                className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer"
                onClick={addWater}
              >
                <Plus></Plus>
              </button>
              <button className="p-2" disabled>
                <GlassWater></GlassWater>
              </button>
              <button
                className="p-2 rounded-lg bg-[var(--bg-button-add)]/10 hover:bg-[var(--bg-button-add)]/30 cursor-pointer"
                onClick={removeWater}
              >
                <Minus></Minus>
              </button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[448px] rounded-md">
            <div className="flex flex-col gap-8 pr-3">
              <CardAlimentoDiario name="Desayuno"></CardAlimentoDiario>
              <CardAlimentoDiario name="Almuerzo"></CardAlimentoDiario>
              <CardAlimentoDiario name="Cena"></CardAlimentoDiario>
              <CardAlimentoDiario name="Snack"></CardAlimentoDiario>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}
