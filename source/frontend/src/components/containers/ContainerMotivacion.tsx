import type { MotivationalMessage } from "@/types";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";

const mensajesMotivacion: MotivationalMessage[] = [
  {
    id: "1",
    message: "No busques ser perfecto, busca ser constante",
  },
  {
    id: "2",
    message: "El progreso lento sigue siendo progreso",
  },
  {
    id: "3",
    message: "Descansa si lo necesitas, pero no te rindas",
  },
  {
    id: "4",
    message: "Tu esfuerzo de hoy es tu éxito de mañana",
  },
  {
    id: "5",
    message: "La motivación te inicia, el hábito te mantiene",
  },
  {
    id: "6",
    message: "La disciplina es recordar lo que quieres",
  }
]


export function ContainerMotivacion() {
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % mensajesMotivacion.length
      );
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const currentMessage = mensajesMotivacion[currentIndex];

  return (
    <Card
      className="h-full "
      style={{
        background:
          "linear-gradient(175deg,#FFF 70%, #CFE0C3 100%)",
      }}
    >
      <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center ">
        <p
          key={currentMessage.id}
          className="text-lg font-medium text-naranja animate-in fade-in zoom-in duration-1000 "
        >
          “{currentMessage.message}”
        </p>
      </CardContent>
    </Card>
  );
}