
import { ContainerDiaConsumo } from "../containers/ContainerDiaConsumo";
import { CardAlimentoDiario } from "../cards/CardAlimentoDiario";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import { GenerarRecetaSheet } from "../sheets/GenerateRecipeSheet";


export function RecipeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAlimentos] = useState(true); // Cambiar a false para probar el botón deshabilitado

  const handleConsultar = () => {
    if (hasAlimentos) {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-6 h-full" aria-labelledby="recipes-title">
        <h1 id="recipes-title" className="font-bold text-2xl text-[var(--modeThird)] select-none">
          Recetas
        </h1>
        <div className="flex flex-col md:flex-row  gap-6 w-full h-full">
          <ContainerDiaConsumo></ContainerDiaConsumo>

          <Card className="w-full md:max-w-1/3 flex flex-col h-full">
            <CardHeader>
              <CardTitle>Personalizar comida</CardTitle>
              <CardDescription>
                Aquí podrás generar una receta en base a los alimentos que
                tengas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <CardAlimentoDiario name="Alimentos disponibles"></CardAlimentoDiario>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className={`w-full text-white rounded-lg py-5 text-base cursor-pointer transition-all select-none ${
                  hasAlimentos 
                    ? "bg-turquesa hover:bg-turquesa/90" 
                    : "bg-turquesa/60 cursor-not-allowed"
                }`}
                aria-label="Generar receta con alimentos disponibles"
                onClick={handleConsultar}
                disabled={!hasAlimentos}
              >
                Consultar <Zap fill={"#FFF"}></Zap>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <GenerarRecetaSheet isOpen={isOpen} setOpen={setIsOpen}></GenerarRecetaSheet>
    </>
  );
}
