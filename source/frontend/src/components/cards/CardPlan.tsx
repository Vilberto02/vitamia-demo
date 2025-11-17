import { Card, CardContent } from "@/components/ui/card"; // Ajusta la ruta a 'ui'

// 1. Tipos de datos (deben coincidir)
type Tag = "Bajar peso" | "Mediterránea" | "Masa muscular";
type Plan = {
  id: number;
  titulo: string;
  descripcion: string;
  tags: readonly Tag[];
};

interface CardPlanProps {
  plan: Plan;
  onClick: (plan: Plan) => void; // 2. El onClick ahora pasa el objeto 'plan' completo
}

// 3. Función para los colores de las etiquetas
const getTagColor = (tag: Tag) => {
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
    // 4. Se llama a onClick con el 'plan' cuando se hace clic
    <Card
      className="overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick(plan)}
    >
      <CardContent className="p-4 flex items-center gap-4">
        {/* Cuadro de color */}
        <div className="w-24 h-24 bg-green-500 flex-shrink-0 rounded-md"></div>

        {/* Contenido de texto */}
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-1">{plan.titulo}</h3>
          <p className="text-sm text-gray-600 mb-3">{plan.descripcion}</p>
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
