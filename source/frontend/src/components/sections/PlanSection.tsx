import { ContainerInfo } from "../containers/ContainerInfo";
import { ContainerMotivacion } from "../containers/ContainerMotivacion";
import { ContainerPlanes } from "../containers/ContainerPlanes";

export function PlanSection() {
  return (
    <section className="flex flex-col gap-6 h-full">
      {/* 1. ESTA PARTE (EL TÍTULO Y LA META) ESTÁ PERFECTA Y NO CAMBIA */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
          Planes
        </h1>
        <p className="text-[var(--bg-verde-isla)] text-lg font-medium">
          Meta: Bajar de peso
        </p>
      </div>

      {/* --- 2. ¡SOLUCIÓN APLICADA AQUÍ ABAJO! --- */}

      {/* - 'gap-12': Aumenta el espacio, moviendo "Información" más a la derecha.
        - 'items-start': Alinea ambas columnas en la parte de arriba.
      */}
      <div className="flex gap-12 items-start h-full">
        {/* Columna Izquierda (Planes) */}
        {/* - 'flex-1': Le dice a esta columna que "crezca" y ocupe todo
            el espacio extra, haciéndola "más alargada" (ancha).
        */}
        <div className="flex-1">
          <ContainerPlanes></ContainerPlanes>
        </div>

        {/* Columna Derecha (Información) */}
        {/* - 'w-72': Le da un ancho fijo (288px) a esta columna.
            Al ser más angosta, le da más espacio a la columna de planes.
        */}
        <div className="flex flex-col gap-6 w-100">
          <ContainerInfo></ContainerInfo>
          <ContainerMotivacion></ContainerMotivacion>
        </div>
      </div>
    </section>
  );
}
