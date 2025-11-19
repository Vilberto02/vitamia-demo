import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
// No necesitas ScrollArea si el contenido es corto, pero lo dejo por si acaso.
// import { ScrollArea } from "../ui/scroll-area";

export function ContainerInfo() {
  return (
    <Card className="grow">
      {" "}
      {/* 'grow' puede que no sea lo que quieres, 'flex-1' o un ancho fijo (w-80) en la página principal es mejor */}
      <CardHeader>
        <CardTitle>Información</CardTitle>
        <CardDescription>
          Aquí podrás visualizar consejos para llegar a tu meta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Aquí está el contenido que querías agregar */}
        <div className="space-y-4">
          {" "}
          {/* Agregamos espacio entre los ítems de información */}
          {/* Ítem de Hidratación */}
          <div className="flex items-center gap-3">
            {/* Círculo azul de ejemplo. Puedes reemplazarlo por un Icono */}
            <div className="w-10 h-10 rounded-full bg-blue-200 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold">Hidratación adecuada</h4>
              <p className="text-sm text-gray-600">
                Mejora la digestión y la salud de la piel.
              </p>
            </div>
          </div>
          {/* Ítem de Descanso y sueño */}
          <div className="flex items-center gap-3">
            {/* Círculo morado de ejemplo */}
            <div className="w-10 h-10 rounded-full bg-purple-200 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold">Descanso y sueño</h4>
              <p className="text-sm text-gray-600">
                Ayuda a la recuperación del cuerpo y el bienestar mental.
              </p>
            </div>
          </div>
          {/* Ítem de Control del estrés */}
          <div className="flex items-center gap-3">
            {/* Círculo rojo de ejemplo */}
            <div className="w-10 h-10 rounded-full bg-red-200 flex-shrink-0"></div>
            <div>
              <h4 className="font-semibold">Control del estrés</h4>
              <p className="text-sm text-gray-600">
                Previene enfermedades crónicas y ayuda al bienestar emocional.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
