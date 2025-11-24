import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { suggestedRecipe } from "@/mocks/mocks";
import { CheckCheck, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

export function GenerarRecetaSheet({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) {
  const handleAceptar = () => {
    Swal.fire({
      title: "Receta agregada",
      text: "La receta ha sido agregada exitosamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0D484E",
    });
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
    setOpen(false);
  };

  return (
    <Sheet aria-label="Receta generada" open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="p-6 sm:p-9 overflow-y-auto" side="bottom">

        {/* Contenido de la receta */}
        <article className="space-y-6 mb-6" aria-labelledby="recipe-title">
          {/* Título y descripción */}
          <header className="flex justify-between flex-col md:flex-row gap-4 md:gap-6">
            <div>
              <h2 id="recipe-title" className="text-xl font-bold text-carbon-oscuro mb-2 line-clamp-2">
                {suggestedRecipe.title}
              </h2>
              <p className="text-sm text-gris-oscuro line-clamp-2">
                {suggestedRecipe.description}
              </p>
            </div>
            <p className="text-gris-oscuro text-sm pr-2 select-none text-right md:text-left " aria-label="Tipo de receta">Receta propuesta</p>
          </header>

          <ScrollArea className="h-72" aria-label="Detalles de la receta">
            <div className="flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3 pr-3">
              {/* Ingredientes */}
              <section className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl" aria-labelledby="ingredients-title">
                <h3 id="ingredients-title" className="text-lg font-semibold text-carbon-oscuro mb-3 select-none">
                  Ingredientes
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  {suggestedRecipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-sm text-gris-oscuro"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Preparación */}
              <section className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl" aria-labelledby="preparation-title">
                <h3 id="preparation-title" className="text-lg font-semibold text-carbon-oscuro mb-3 select-none">
                  Preparación
                </h3>
                <ol className="space-y-2 list-decimal pl-5">
                  {suggestedRecipe.preparation.map((step, index) => (
                    <li
                      key={index}
                      className="text-sm text-gris-oscuro"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <div className="flex flex-col gap-2">
                <section className="flex flex-col gap-2 border-2 border-gris-oscuro/20 p-4 rounded-xl" aria-labelledby="benefits-title">
                  <h3 id="benefits-title" className="text-lg font-semibold text-carbon-oscuro mb-3 select-none">
                    Beneficios
                  </h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {suggestedRecipe.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="text-sm text-gris-oscuro"
                      >
                        {benefit}
                      </li>
                    ))}
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
            <p className="text-carbon-oscuro font-semibold xl:col-span-2">¿Desea agregar la receta?</p>
            <div className="flex md:flex-row flex-col w-full gap-3 pr-3" role="group" aria-label="Acciones de receta">
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
            </div>
          </footer>
        </article>
      </SheetContent>
    </Sheet>
  );
}