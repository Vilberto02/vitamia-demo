import { useState } from "react"; // 1. Importar useState
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CardPlan } from "../cards/CardPlan";
import { PlanDetailSheet } from "../sections/PlanDetailSheet"; // 2. Importar los nuevos componentes
import SuccessModal from "../sections/SuccessModal1"; // (Import sin llaves)

// 3. ¡MUY IMPORTANTE! Completar TODOS los datos
const listaDePlanes = [
  {
    id: 1,
    titulo: "Dieta DASH",
    descripcion: "Desarrollada para prevenir y controlar la hipertensión...",
    tags: ["Bajar peso"] as const,
    beneficios: [
      { texto: "Mejora la salud cardiovascular y reduce el colesterol." },
    ],
    recetas: {
      desayuno: ["Tostada integral", "Fruta"],
      almuerzo: ["Ensalada de pollo", "Quinoa"],
      cena: ["Pescado al horno", "Verduras"],
    },
  },
  {
    id: 2,
    titulo: "Dieta Mediterránea",
    descripcion: "Basada en los hábitos alimenticios de Grecia e Italia...",
    tags: ["Mediterránea"] as const,
    beneficios: [{ texto: "Reduce el riesgo de enfermedades cardíacas." }],
    recetas: {
      desayuno: [
        "Pan integral con tomate",
        "1 taza de té verde",
        "1 porción de fruta",
      ],
      almuerzo: [
        "Ensalada griega",
        "Filete de pescado al horno",
        "Guarnición de quinoa",
      ],
      cena: ["Crema de verduras", "Pollo a la plancha"],
    },
  },
  {
    id: 3,
    titulo: "Dietas para Aumentar Masa Muscular",
    descripcion: "Esta dieta se enfoca en consumir más calorías...",
    tags: ["Masa muscular"] as const,
    beneficios: [{ texto: "Optimiza el crecimiento muscular." }],
    recetas: {
      // Rellenar con arrays vacíos si no hay datos
      desayuno: ["Batido de proteína", "Avena"],
      almuerzo: ["Pollo y arroz", "Brócoli"],
      cena: ["Carne magra", "Papa dulce"],
    },
  },
  // ... (Añade el plan 4 'Detox' con la misma estructura)
];

// 4. Definir el tipo 'Plan' a partir de los datos
type Plan = (typeof listaDePlanes)[0];

export function ContainerPlanes() {
  // 5. Definir los estados
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 6. Definir las funciones (handlers)
  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsSheetOpen(true);
  };

  const handleAddPlan = () => {
    // Aquí iría la lógica para guardar en la base de datos
    setIsSheetOpen(false); // Cierra el panel
    setIsModalOpen(true); // Abre el modal de éxito
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    // 7. Renderizar Usar un Fragment (<>)
    <>
      <Card>
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
                <CardPlan key={plan.id} plan={plan} onClick={handlePlanClick} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* 8. Renderizar los componentes ocultos */}
      <PlanDetailSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAddPlan={handleAddPlan}
        plan={selectedPlan}
      />

      {/* 9. Renderizado condicional para TU modal */}
      {isModalOpen && (
        <SuccessModal
          onClose={handleCloseModal}
          title="Plan agregado"
          message="El plan ha sido añadido exitosamente a tu perfil."
        />
      )}
    </>
  );
}
