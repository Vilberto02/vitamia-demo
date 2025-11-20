
import { ContainerDiaConsumo } from "./ContainerDiaConsumo";
import { CardAlimentoDiario } from "../cards/CardAlimentoDiario";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";


export function RecipeSection() {

  return (
    <>
      <section className="flex flex-col gap-6 h-full">
        <h1 className="font-bold text-2xl text-[var(--modeThird)] select-none">
          Recetas
        </h1>
        <div className="flex gap-6 w-full h-full">
          <ContainerDiaConsumo></ContainerDiaConsumo>

          <Card className="w-full max-w-1/3 flex flex-col h-full">
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
              <Button className="w-full bg-turquesa text-white rounded-lg py-5 text-base hover:bg-turquesa/90 cursor-pointer">
                Consultar <Zap fill="#FFF"></Zap>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

