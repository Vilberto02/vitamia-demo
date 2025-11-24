import { getTagColorClass } from "@/lib/utils";
import type { Plan } from "@/types";
import { Route } from "lucide-react";

type CardPlanProps = {
  plan: Plan;
  onClick: () => void;
};

export function CardPlan({ plan, onClick }: CardPlanProps) {
  return (
    <div
      className="flex gap-6 items-start border-2 border-stone-50 px-2 py-4 md:py2 rounded-2xl hover:bg-stone-50/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-0 md:w-36 aspect-square rounded-lg shrink-0 bg-verde-isla flex justify-center items-center">
        <Route className="text-white" size={56}></Route>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-carbon-oscuro line-clamp-1 sm:line-clamp-2">
          {plan.title}
        </h4>
        <p className="text-gris-oscuro text-base line-clamp-2">
          {plan.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {plan.tags.map((tag) => {
            const tagColorClass = getTagColorClass(tag);

            return (
              <p
                key={tag}
                className={`min-w-36 mt-2 text-center text-sm py-1 px-4 border font-medium rounded-xl ${tagColorClass}`}
              >
                {tag}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
