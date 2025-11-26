import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { MoveUpRight } from "lucide-react";
import { useState } from "react";
import { PlanDetailSheet } from "../sheets/PlanDetailSheet";
import type { PlanCompleto } from "@/types";
import { miListadoPlanes } from "@/mocks/mocks";

export function ContainerMisPlanes() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanCompleto>();
  const handleSelectPlan = (plan: PlanCompleto) => {
    setSelectedPlan(plan);
    setIsOpen(true);
  };

  return (
    <>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Mis planes</CardTitle>
          <CardDescription>Planes asociados a tu perfil.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <div className="flex flex-col gap-3 pr-3">
              {miListadoPlanes.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between gap-4 cursor-pointer border border-verde-te/40 p-2 rounded-md bg-verde-te/10 hover:bg-verde-te/40"
                  onClick={() => handleSelectPlan(plan.plan)}
                >
                  <p className="line-clamp-1 text-sm">{plan.plan.nombre}</p>
                  <MoveUpRight className="w-5 h-5 shrink-0 text-naranja"></MoveUpRight>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <PlanDetailSheet
        isOpen={isOpen}
        setOpen={setIsOpen}
        selectedPlan={selectedPlan}
        isUserPlan={true}
      ></PlanDetailSheet>
    </>
  );
}
