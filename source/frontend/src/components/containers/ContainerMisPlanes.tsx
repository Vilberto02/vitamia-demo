import { listaDePlanes } from "@/mocks/mocks";
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
import type { Plan } from "@/types";

export function ContainerMisPlanes() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>();

  const handleSelectPlan = (plan: Plan) => {
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
              {listaDePlanes.map(
                (plan) =>
                  plan.isUserPlan && (
                    <div
                      key={plan.id}
                      className="flex items-center justify-between gap-4 cursor-pointer border border-verde-te/40 p-2 rounded-md bg-verde-te/10 hover:bg-verde-te/40"
                      onClick={() => handleSelectPlan(plan)}
                    >
                      <p className="line-clamp-1 text-sm">{plan.title}</p>
                      <MoveUpRight className="w-5 h-5 shrink-0 text-naranja"></MoveUpRight>
                    </div>
                  )
              )}
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
