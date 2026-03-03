import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { CheckCheck, ChevronLeft, ChevronRight, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { useRecipe } from "@/hooks/useRecipe";

export function GenerarRecetaSheet({
  isOpen,
  setOpen,
}: Readonly<{
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}>) {
  const { generadas, recetaSeleccionada, seleccionarReceta, limpiarGeneradas } =
    useRecipe();

  const recetas = generadas?.recetas ?? [];
  const currentIndex = recetaSeleccionada
    ? recetas.indexOf(recetaSeleccionada)
    : 0;

  const handleNavegar = (direction: "prev" | "next") => {
    if (recetas.length === 0) return;
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + recetas.length) % recetas.length
        : (currentIndex + 1) % recetas.length;
    seleccionarReceta(recetas[newIndex]);
  };

  const handleAceptar = () => {
    Swal.fire({
      title: "Receta agregada",
      text: "La receta ha sido agregada exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0D484E",
    });
    limpiarGeneradas();
    setOpen(false);
  };

  const handleRechazar = () => {
    Swal.fire({
      title: "Receta rechazada",
      text: "La receta ha sido rechazada.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0D484E",
    });
    limpiarGeneradas();
    setOpen(false);
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      limpiarGeneradas();
    }
    setOpen(open);
  };

  if (!recetaSeleccionada) return null;

  return (
    <Sheet
      aria-label="Receta generada"
      open={isOpen}
      onOpenChange={handleClose}
    >
      <SheetContent className="p-6 sm:p-9 overflow-y-auto" side="bottom">
        {/* Contenido de la receta */}
        <article className="space-y-6 mb-6" aria-labelledby="recipe-title">
          {/* Título y descripción */}
          <header className="flex justify-between flex-col md:flex-row gap-4 md:gap-6">
            <div>
              <h2
                id="recipe-title"
                className="text-xl font-bold text-carbon-oscuro mb-2 line-clamp-2"
              >
                {recetaSeleccionada.titulo}
              </h2>
              <p className="text-sm text-gris-oscuro line-clamp-3">
                {recetaSeleccionada.descripcion}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <p
                className="text-verde-isla text-sm pr-2 select-none text-right md:text-left"
                aria-label="Tipo de receta"
              >
                Receta de {generadas?.tipo_comida ?? "comida"}
              </p>
              {recetas.length > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => handleNavegar("prev")}
                    aria-label="Receta anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-gris-oscuro select-none">
                    {currentIndex + 1}/{recetas.length}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 cursor-pointer"
                    onClick={() => handleNavegar("next")}
                    aria-label="Receta siguiente"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </header>

          <ScrollArea className="h-72" aria-label="Detalles de la receta">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3 pr-3">
              {/* Ingredientes */}
              <section
                className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl"
                aria-labelledby="ingredients-title"
              >
                <h3
                  id="ingredients-title"
                  className="text-lg font-semibold text-carbon-oscuro mb-3 select-none"
                >
                  Ingredientes
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  {recetaSeleccionada.ingredientes.map((ingredient) => (
                    <li key={ingredient} className="text-sm text-gris-oscuro">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Preparación */}
              <section
                className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl"
                aria-labelledby="preparation-title"
              >
                <h3
                  id="preparation-title"
                  className="text-lg font-semibold text-carbon-oscuro mb-3 select-none"
                >
                  Preparación
                </h3>
                <ol className="space-y-2 list-decimal pl-5">
                  {recetaSeleccionada.procedimiento.map((step) => (
                    <li key={step} className="text-sm text-gris-oscuro">
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <div className="flex flex-col gap-2">
                <section
                  className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl"
                  aria-labelledby="benefits-title"
                >
                  <h3
                    id="benefits-title"
                    className="text-lg font-semibold text-carbon-oscuro mb-3 select-none"
                  >
                    Información
                  </h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li className="text-sm text-gris-oscuro">
                      {recetaSeleccionada.beneficios}
                    </li>
                    <li className="text-sm text-gris-oscuro">
                      Tiempo: {recetaSeleccionada.tiempo_preparacion}
                    </li>
                    <li className="text-sm text-gris-oscuro">
                      Calorías aprox: {recetaSeleccionada.calorias_aproximadas}{" "}
                      kcal
                    </li>
                  </ul>
                </section>

                {/* Nota */}
                <aside className="pl-3" aria-label="Nota informativa">
                  <p className="text-sm text-gris-oscuro">
                    <span className="font-semibold">Nota:</span> Si aceptas la
                    receta, esta será agregada a la sección de Recetas y podrás
                    visualizarla más tarde.
                  </p>
                </aside>
              </div>
            </div>
          </ScrollArea>
          <footer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <p className="text-carbon-oscuro font-semibold xl:col-span-2">
              ¿Desea agregar la receta?
            </p>
            <fieldset className="flex md:flex-row flex-col w-full gap-3 pr-3">
              <legend className="sr-only">Acciones de receta</legend>
              <Button
                type="button"
                onClick={handleRechazar}
                variant="outline"
                aria-label="Rechazar receta propuesta"
                className="flex-1 border-2 border-stone-300 hover:bg-stone-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <X size={18} aria-hidden="true" />
                Rechazar
              </Button>
              <Button
                type="button"
                onClick={handleAceptar}
                aria-label="Aceptar y guardar receta propuesta"
                className="flex-1 bg-turquesa hover:bg-turquesa/90 text-white cursor-pointer"
              >
                <CheckCheck aria-hidden="true"></CheckCheck>
                Aceptar
              </Button>
            </fieldset>
          </footer>
        </article>
      </SheetContent>
    </Sheet>
  );
}
