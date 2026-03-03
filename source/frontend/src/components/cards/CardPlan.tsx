import type { PlanCompleto } from "@/types";
import { Route } from "lucide-react";

type CardPlanProps = {
  plan: PlanCompleto;
  onClick: () => void;
};

export function CardPlan({ plan, onClick }: Readonly<CardPlanProps>) {
  return (
    <button
      className="flex gap-6 items-start border-2 border-stone-50 px-2 py-4 md:py2 rounded-2xl hover:bg-stone-50/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-0 md:w-36 aspect-square rounded-lg shrink-0 bg-verde-isla flex justify-center items-center">
        <Route className="text-white" size={56}></Route>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-left text-xl font-semibold text-carbon-oscuro line-clamp-1 sm:line-clamp-2">
          {plan.nombre}
        </h4>
        <p className="text-left text-gris-oscuro text-base line-clamp-2">
          {plan.descripcion}
        </p>
      </div>
    </button>
  );
}
