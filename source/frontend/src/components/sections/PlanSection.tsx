import { ContainerInfo } from "../containers/ContainerInfo";
import { ContainerMotivacion } from "../containers/ContainerMotivacion";
import { ContainerPlanes } from "../containers/ContainerPlanes";

export function PlanSection() {
  return (
    <section className="flex flex-col gap-6 h-full w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-carbon-oscuro select-none">
          Planes
        </h1>
        <p className="text-[var(--bg-verde-isla)] text-lg font-medium">
          Meta: Bajar de peso
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start w-full h-full">
        <div className="flex-1 w-full">
          <ContainerPlanes></ContainerPlanes>
        </div>
        <div className="flex flex-col gap-6 pb-6 xl:pb-0 w-full h-full xl:max-w-1/4 xl:min-w-[300px]">
          <ContainerInfo></ContainerInfo>
          <ContainerMotivacion></ContainerMotivacion>
        </div>
      </div>
    </section>
  );
}
