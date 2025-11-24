import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { mensajesMotivacion } from "@/mocks/mocks";


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
      className="h-full w-full "
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