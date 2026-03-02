import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardPlan } from "../cards/CardPlan";
import { PlanDetailSheet } from "../sheets/PlanDetailSheet";
import { useState } from "react";
import type { PlanCompleto } from "@/types";
import { listaDePlanes } from "@/mocks/mocks";

export function ContainerPlanes() {
  const [selectedPlan, setSelectedPlan] = useState<PlanCompleto>();
  const [isOpen, setOpen] = useState(false);

  const handleSelectPlan = (plan: PlanCompleto) => {
    setSelectedPlan(plan);
    setOpen(true);
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Lista de planes</CardTitle>
          <CardDescription>
            Aquí podrás visualizar combinaciones de alimentos para llegar a tu
            meta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[636px]">
            <div className="flex flex-col gap-3 pr-3">
              {listaDePlanes.map((plan) => (
                <CardPlan
                  key={plan.id}
                  plan={plan}
                  onClick={() => handleSelectPlan(plan)}
                ></CardPlan>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <PlanDetailSheet
        isOpen={isOpen}
        setOpen={setOpen}
        selectedPlan={selectedPlan}
        isUserPlan={false}
      ></PlanDetailSheet>
    </>
  );
}
