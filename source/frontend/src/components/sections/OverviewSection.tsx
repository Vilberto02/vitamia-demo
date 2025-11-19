import { ContainerAlimento } from "../containers/ContainerAlimento";
import { ContainerConsumo } from "../containers/ContainerConsumo";
import { ContainerLogro } from "../containers/ContainerLogro";
// --- ¡NUEVO! Imports para el estado y los iconos ---
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export function OverviewSection() {
  // --- ¡NUEVO! Estado para nuestro propio "Toast" ---
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success", // 'success' o 'error'
  });

  // --- ¡NUEVA! Función para MOSTRAR el toast ---
  const showToast = (message: string, type: "success" | "error") => {
    // 1. Lo mostramos
    setToast({ visible: true, message, type });

    // 2. Lo ocultamos después de 3 segundos
    setTimeout(() => {
      setToast({ visible: false, message: "", type });
    }, 3000);
  };

  // --- ¡NUEVA! Función para el botón de AÑADIR ---
  const handleAddWater = () => {
    showToast("Se aumentó tu consumo diario de agua.", "success");
    // (Opcional: aquí puedes sumar 1 al contador de agua)
  };

  // --- ¡NUEVA! Función para el botón de QUITAR ---
  const handleRemoveWater = () => {
    showToast("Se redujo tu consumo diario de agua.", "error");
    // (Opcional: aquí puedes restar 1 al contador de agua)
  };

  return (
    <section className="flex flex-col gap-6 h-full relative">
      {" "}
      {/* <-- Añadido 'relative' */}
      <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
        General
      </h1>
      {/* Tarjetas de información general (Sin cambios) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="flex gap-6">
        {/* Sección de alimentos ingeridos */}
        {/* --- ¡ACTUALIZADO! Pasamos las funciones como props --- */}
        <ContainerAlimento
          onAddWater={handleAddWater}
          onRemoveWater={handleRemoveWater}
        />
        {/* Sección derecha: Balance de consumo y Logros */}
        <div className="w-full flex flex-col gap-6">
          <ContainerConsumo></ContainerConsumo>
          {/* Balance de consumo */}

          {/* Logros */}
          <ContainerLogro></ContainerLogro>
        </div>
      </div>
      {/* --- ¡NUEVO! El código del Toast que se mostrará --- */}
      {toast.visible && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-in fade-in-0 slide-in-from-top-10
            ${
              toast.type === "success"
                ? "bg-white border-green-500 border text-black" // Estilo éxito
                : "bg-red-600 text-white" // Estilo error
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <XCircle />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </section>
  );
}
