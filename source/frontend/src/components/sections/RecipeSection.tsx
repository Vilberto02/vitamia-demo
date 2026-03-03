import { ContainerDiaConsumo } from "../containers/ContainerDiaConsumo";
import { CardAlimentoDiario } from "../cards/CardAlimentoDiario";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, Zap } from "lucide-react";
import { useCallback, useState } from "react";
import { GenerarRecetaSheet } from "../sheets/GenerateRecipeSheet";
import { useRecipe } from "@/hooks/useRecipe";
import toast from "react-hot-toast";
import type { Alimento, AlimentoRequest } from "@/types";

type TipoComida = "desayuno" | "almuerzo" | "cena" | "snack";

const TIPO_LABELS: Record<TipoComida, string> = {
  desayuno: "Desayuno",
  almuerzo: "Almuerzo",
  cena: "Cena",
  snack: "Snack",
};

export function RecipeSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("desayuno");
  const [alimentosDisponibles, setAlimentosDisponibles] = useState<Alimento[]>(
    [],
  );
  const { generarRecetas, isGenerating } = useRecipe();

  const tipoComida = activeTab as TipoComida;
  const hasAlimentos = alimentosDisponibles.length >= 3;

  const handleAlimentosChange = useCallback((alimentos: Alimento[]) => {
    setAlimentosDisponibles(alimentos);
  }, []);

  const handleConsultar = async () => {
    if (!hasAlimentos) {
      toast.error("Agrega al menos 3 alimentos para generar recetas.");
      return;
    }

    // Mapear alimentos al formato AlimentoRequest
    const alimentosRequest: AlimentoRequest[] = alimentosDisponibles.map(
      (a) => ({
        nombre: a.name,
        categoria: "General",
        cantidad: a.cantidad,
        unidad: a.unidad.name,
      }),
    );

    try {
      await toast.promise(generarRecetas(tipoComida, alimentosRequest), {
        loading: `Generando recetas de ${TIPO_LABELS[tipoComida]} con IA...`,
        success: (res) => res.mensaje || "¡Recetas generadas!",
        error: "Error al generar recetas.",
      });
      setIsOpen(true);
    } catch {
      // El error ya se maneja en el toast
    }
  };

  return (
    <>
      <section
        className="flex flex-col gap-6 h-full"
        aria-labelledby="recipes-title"
      >
        <h1
          id="recipes-title"
          className="font-bold text-2xl text-[var(--modeThird)] select-none"
        >
          Recetas
        </h1>
        <div className="flex flex-col md:flex-row  gap-6 w-full h-full">
          <ContainerDiaConsumo
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <Card className="w-full md:max-w-1/3 flex flex-col h-full">
            <CardHeader>
              <CardTitle>Personalizar comida</CardTitle>
              <CardDescription>
                Aquí podrás generar una receta de{" "}
                <span className="font-semibold text-turquesa">
                  {TIPO_LABELS[tipoComida]}
                </span>{" "}
                en base a los alimentos que tengas.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 mb-3">
              <CardAlimentoDiario
                name="Alimentos disponibles"
                onAlimentosChange={handleAlimentosChange}
              />
            </CardContent>
            <CardFooter className="mt-auto flex-col gap-2">
              {!hasAlimentos && alimentosDisponibles.length > 0 && (
                <p className="text-xs text-amber-600 text-center">
                  Necesitas al menos 3 alimentos para generar recetas.
                </p>
              )}
              <Button
                className={`w-full text-white rounded-lg py-5 text-base cursor-pointer transition-all select-none ${
                  hasAlimentos && !isGenerating
                    ? "bg-turquesa hover:bg-turquesa/90"
                    : "bg-turquesa/60 cursor-not-allowed"
                }`}
                aria-label={`Generar receta de ${TIPO_LABELS[tipoComida]} con alimentos disponibles`}
                onClick={handleConsultar}
                disabled={!hasAlimentos || isGenerating}
              >
                {isGenerating ? (
                  <>
                    Generando <Loader2 className="animate-spin" />
                  </>
                ) : (
                  <>
                    Consultar <Zap fill={"#FFF"}></Zap>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      <GenerarRecetaSheet
        isOpen={isOpen}
        setOpen={setIsOpen}
      ></GenerarRecetaSheet>
    </>
  );
}
