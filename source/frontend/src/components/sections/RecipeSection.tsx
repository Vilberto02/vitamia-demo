import { ContainerDiaConsumo } from "./ContainerDiaConsumo";
import { ContainerPersonalizarComida } from "../containers/ContainerPersonalizarComida";

export function RecipeSection() {
  return (
    <section className="flex flex-col gap-6 h-full">
      <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
        Recetas
      </h1>
      <div className="flex gap-6 w-full h-full">
        <ContainerDiaConsumo></ContainerDiaConsumo>
        <ContainerPersonalizarComida></ContainerPersonalizarComida>
      </div>
    </section>
  );
}
