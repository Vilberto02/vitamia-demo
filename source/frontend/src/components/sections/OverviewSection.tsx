import { ContainerAlimento } from "../containers/ContainerAlimento";
import { ContainerConsumo } from "../containers/ContainerConsumo";
import { ContainerLogro } from "../containers/ContainerLogro";

export function OverviewSection() {
  return (
    <section className="flex flex-col gap-6 h-full">
      <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
        General
      </h1>

      {/* Tarjetas de información general */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-4 rounded-lg shadow flex flex-col gap-4 justify-center"
          style={{
            background:
              "radial-gradient(238.72% 191.03% at 119.6% -21.43%, #FF6E06 0%, #FFD3B3 50.79%, #FFF 100%)",
          }}
        >
          <h2 className="text-lg font-medium text-gray-700">
            Total de calorías
          </h2>
          <p className="text-5xl font-bold">1224</p>
          <p className="text-sm text-gray-700">Kcal</p>
        </div>

        <div
          className="p-4 rounded-lg shadow flex flex-col gap-4 justify-center"
          style={{
            background:
              "linear-gradient(291deg, #177E89 -9.83%, #93C3C8 31.45%, #FFF 105.75%)",
          }}
        >
          <h2 className="text-lg font-medium text-gray-700">Agua consumida</h2>
          <p className="text-5xl font-bold">12</p>
          <p className="text-sm text-gray-700">Vasos</p>
        </div>

        <div
          className="p-4 rounded-lg shadow flex flex-col gap-4 justify-center"
          style={{
            background:
              "radial-gradient(301.68% 141.42% at 99.87% 0%, #8DFF3C 0%, #FFF 100%)",
          }}
        >
          <h2 className="text-lg font-medium text-gray-700">Peso</h2>
          <p className="text-5xl font-bold">96</p>
          <p className="text-sm text-gray-700">Kg</p>
        </div>

        <div
          className="p-4 rounded-lg shadow flex flex-col gap-4 "
          style={{
            background:
              "linear-gradient(180deg, #FEB21A 0%, #FFE5B3 65.43%, #FFF 134.35%)",
          }}
        >
          <h2 className="text-lg font-medium text-gray-700">IMC</h2>
          <p className="text-5xl font-bold">25</p>
        </div>
      </div>

      {/* Contenedor principal para las secciones inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        {/* Sección de alimentos ingeridos */}
        <ContainerAlimento></ContainerAlimento>

        {/* Sección derecha: Balance de consumo y Logros */}
        <div className="flex flex-col gap-6">
          {/* Balance de consumo */}
          <ContainerConsumo></ContainerConsumo>

          {/* Logros */}
          <ContainerLogro></ContainerLogro>
        </div>
      </div>
    </section>
  );
}
