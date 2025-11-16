import { Card, CardContent } from "@/components/ui/card";

type Tag = "Bajar peso" | "Mediterránea" | "Masa muscular";

interface Plan {
  id: number;
  titulo: string;
  descripcion: string;
  tags: readonly Tag[];
}

interface CardPlanProps {
  plan: Plan;
  onClick?: (planId: number) => void;
}

const getTagColor = (tag: Tag) => {
  // ... (la función de color no cambia)
  switch (tag) {
    case "Bajar peso":
      return "bg-green-100 text-green-800";
    case "Mediterránea":
      return "bg-yellow-100 text-yellow-800";
    case "Masa muscular":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function CardPlan({ plan, onClick }: CardPlanProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick && onClick(plan.id)}
    >
      {/* --- ¡CAMBIO PRINCIPAL AQUÍ! ---
        1. Quitamos "p-0" y lo cambiamos por "p-4" (1rem de padding).
        2. Añadimos "gap-4" para crear el espacio entre el cuadro y el texto.
      */}
      <CardContent className="p-4 flex items-center gap-4">
        {/* 1. Caja de imagen (cuadrado verde) */}
        {/* Quitamos "mr-4" porque "gap-4" en el CardContent ya hace ese trabajo */}
        <div className="w-24 h-24 bg-green-500 flex-shrink-0 rounded-md">
          {/* Aquí podrías poner un <img> si tuvieras una */}
        </div>

        {/* 2. Contenido de texto */}
        {/* Quitamos "p-4" de este div, porque el CardContent ya nos da el padding */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-1">{plan.titulo}</h3>
          <p className="text-sm text-gray-600 mb-3">{plan.descripcion}</p>

          {/* 3. Etiquetas (Tags) */}
          <div className="flex gap-2">
            {plan.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(
                  tag
                )}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
