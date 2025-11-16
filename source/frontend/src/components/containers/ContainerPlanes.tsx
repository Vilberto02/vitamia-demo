import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardPlan } from "../cards/CardPlan";

const listaDePlanes = [
  {
    id: 1, // <--- Asegúrate de que tus planes tengan un ID
    titulo: "Dieta DASH (Dietary Approaches to Stop Hypertension)",
    descripcion:
      "Desarrollada para prevenir y controlar la hipertensión, esta dieta se enfoca en reducir la sal y aumentar el consumo de potasio, magnesio y calcio.",
    tags: ["Bajar peso"] as const,
  },
  {
    id: 2,
    titulo: "Dieta Mediterránea",
    descripcion:
      "Basada en los hábitos alimenticios tradicionales de países como Grecia e Italia. Se enfoca en alimentos frescos, aceite de oliva, pescados y legumbres.",
    tags: ["Mediterránea"] as const,
  },
  {
    id: 3,
    titulo: "Dietas para Aumentar Masa Muscular",
    descripcion:
      "Esta dieta se enfoca en consumir más calorías de las que el cuerpo quema, principalmente a través de proteínas de alta calidad, carbohidratos y grasas saludables.",
    tags: ["Masa muscular"] as const,
  },
  {
    id: 4,
    titulo: "Dietas Detox",
    descripcion:
      "Esta dieta se basa en consumir jugos naturales y frescos, principalmente de frutas y verduras, para eliminar toxinas y mejorar la digestión.",
    tags: ["Bajar peso", "Mediterránea"] as const,
  },
];

export function ContainerPlanes() {
  // Función que se ejecutará cuando se haga click en un plan
  const handlePlanClick = (planId: number) => {
    console.log(`¡Plan con ID ${planId} clickeado!`);
    // Aquí puedes añadir la lógica que desees:
    // - Navegar a una página de detalle del plan:
    //   history.push(`/planes/${planId}`);
    // - Mostrar un modal con más información del plan.
    // - Marcar el plan como "seleccionado".
  };

  return (
    <Card className="grow">
      <CardHeader>
        <CardTitle>Lista de planes</CardTitle>
        <CardDescription>
          Aquí podrás visualizar combinaciones de alimentos para llegar a tu
          meta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="space-y-4 pr-4">
            {listaDePlanes.map((plan) => (
              // Pasamos la función handlePlanClick al componente CardPlan
              <CardPlan key={plan.id} plan={plan} onClick={handlePlanClick} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
