import { Plus, Minus, GlassWater } from "lucide-react";

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
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Alimentos ingeridos</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Plus></Plus>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <GlassWater></GlassWater>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <Minus></Minus>
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Aquí agregas los alimentos que ingieres en tu día.
          </p>

          {/* Desayuno */}
          <div className="mb-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-medium">Desayuno</h3>
              <button className="text-gray-400">⋮</button>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">▲</span>
                <span>Fideos</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="200"
                  className="w-20 border rounded p-1 text-right"
                />
                <span className="w-24 text-gray-600">gramos</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🍏</span>
                <span>Manzana</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="2"
                  className="w-20 border rounded p-1 text-right"
                />
                <span className="w-24 text-gray-600">Unidad</span>
              </div>
            </div>

            <button className="w-full border border-dashed rounded-lg p-2 text-gray-500 mt-2 flex items-center justify-center">
              <span className="mr-1">+</span> Agregar alimento
            </button>
          </div>

          {/* Almuerzo */}
          <div className="mb-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-medium">Almuerzo</h3>
              <button className="text-gray-400">⋮</button>
            </div>

            <button className="w-full border border-dashed rounded-lg p-2 text-gray-500 mt-2 flex items-center justify-center">
              <span className="mr-1">+</span> Agregar alimento
            </button>
          </div>

          {/* Cena */}
          <div>
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-medium">Cena</h3>
              <button className="text-gray-400">⋮</button>
            </div>

            <button className="w-full border border-dashed rounded-lg p-2 text-gray-500 mt-2 flex items-center justify-center">
              <span className="mr-1">+</span> Agregar alimento
            </button>
          </div>
        </div>

        {/* Sección derecha: Balance de consumo y Logros */}
        <div className="flex flex-col gap-6">
          {/* Balance de consumo */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Balance de consumo</h2>
            <p className="text-sm text-gray-500 mb-4">
              Aquí podrás visualizar un gráfico de barras de los alimentos que
              comúnmente ingieres.
            </p>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-center mb-2">
                Consumo de calorías durante el año
              </h3>
              <div className="h-40 flex items-end justify-between gap-1 border-b border-l">
                {[
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                ].map((month, index) => {
                  // Alturas aleatorias para simular el gráfico
                  const heights = [70, 90, 50, 80, 65, 85, 45];
                  return (
                    <div
                      key={month}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-amber-200 rounded-t"
                        style={{ height: `${heights[index]}%` }}
                      ></div>
                      <span className="text-xs mt-1">
                        {month.substring(0, 4)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Logros */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">Logros</h2>
            <p className="text-sm text-gray-500 mb-4">
              Aquí podrás visualizar tus logros completados.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Frutero</h3>
                  <p className="text-sm text-gray-500">
                    Comer frutas 5 días seguidos.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-800"></div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Constante</h3>
                  <p className="text-sm text-gray-500">Racha de una semana.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-800"></div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">VidaFit</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-teal-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
