import { ContainerInfo } from "../containers/ContainerInfo";
import { ContainerMotivacion } from "../containers/ContainerMotivacion";
import { ContainerPlanes } from "../containers/ContainerPlanes";

export function PlanSection() {
  return (
    <section className="flex flex-col gap-6 h-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-carbon-oscuro select-none">
          Planes
        </h1>
        <p className="text-[var(--bg-verde-isla)] text-lg font-medium">
          Meta: Bajar de peso
        </p>
      </div>

      <div className="flex gap-6 items-start h-full">
        <div className="flex-1">
          <ContainerPlanes></ContainerPlanes>
        </div>
        <div className="flex flex-col gap-6 w-full h-full max-w-1/4">
          <ContainerInfo></ContainerInfo>
          <ContainerMotivacion></ContainerMotivacion>
        </div>
      </div>
    </section>
  );
}
