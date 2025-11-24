import Logo from "@/assets/name-bg-vitamia.svg"
import { Link } from "react-router";
import DashboardPreview from "@/assets/dashboard-svg.svg"
import { ArrowRight, ChartNoAxesGantt, ChartPie, ConciergeBell, Salad } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingPage() {

  return (
    <div className="">
      <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <img
            src={Logo}
            alt="Logo Vitamia"
            className="h-6 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Button
              variant={"link"}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-stone-500 hover:text-carbon-oscuro transition-colors cursor-pointer"
            >
              Inicio
            </Button>
            <Button
              variant={"link"}
              onClick={() => {
                const section = document.getElementById("features");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-stone-500 hover:text-carbon-oscuro transition-colors cursor-pointer"
            >
              Características
            </Button>
            <Button
              variant={"link"}
              className="text-stone-500 hover:text-carbon-oscuro transition-colors"
            >
              Nosotros
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium hover:bg-stone-100 px-4 py-2 rounded-full transition-colors hidden sm:block"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="bg-white text-black border border-stone-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors"
            >
              Empezar
            </Link>
          </div>
        </div>
      </nav>

      <main className="">
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background -z-10"></div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-20 opacity-50"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-verde-te bg-verde-te/10 text-xs font-medium text-turquesa mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              Disponible para estudiantes universitarios
            </div>

            <h1 className="text-4xl md:text-8xl font-bold tracking-tight mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-b from-naranja to-white/50">
              Tu nutrición, nuestro compromiso.
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
              Vitamia es la plataforma inteligente que ayuda a las personas a
              gestionar sus hábitos alimenticios.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/home"
                className="h-12 px-8 rounded-full bg-turquesa text-white font-medium hover:bg-turquesa/90 transition-all flex items-center justify-center gap-2 group"
              >
                Comenzar ahora
                <ArrowRight></ArrowRight>
              </Link>
            </div>

            <div className="mt-20 relative mx-auto max-w-5xl">
              <img
                src={DashboardPreview}
                alt="Vista previa del Dashboard"
                className="shadow-lg shadow-carbon-oscuro/20 rounded-xl"
              />
            </div>
          </div>
        </section>

        {/*<!-- Features -->*/}
        <section id="features" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Todo lo que necesitas para gestionar tus comidas
              </h2>
              <p className="text-muted-foreground">
                Impulsado con Inteligencia Artificial para promover la
                transformación digital junto al cuidado de la salud.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              <div className="md:col-span-2 rounded-xl border border-stone-100 bg-card p-8 relative overflow-hidden group hover:border-stone-300 transition-colors">
                <div className="relative z-10">
                  <div className="size-12 flex items-center justify-center mb-4 bg-naranja/5 text-naranja rounded-lg">
                    <ConciergeBell></ConciergeBell>
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Generación de recetas
                  </h3>
                  <p className="text-gris-oscuro max-w-md">
                    Genera recetas basadas en los alimentos que tienes en casa
                    pero que tenga su toque saludable.
                  </p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-naranja/5 to-transparent"></div>
              </div>

              {/*<!-- Tall Card -->*/}
              <div className="md:row-span-2 rounded-xl border border-stone-100 bg-card p-8 relative overflow-hidden group hover:border-stone-300 transition-colors">
                <div className="relative z-10 h-full flex flex-col">
                  <div className="size-12 rounded-lg bg-green-500/5 flex items-center justify-center mb-4 text-green-600">
                    <ChartPie></ChartPie>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Estadísticas</h3>
                  <p className="text-muted-foreground mb-8">
                    Conecta tus hábitos alimenticios con tu energía y
                    concentración.
                  </p>

                  <div className="mt-auto relative h-48 w-full bg-muted/20 rounded-lg overflow-hidden border border-border/50">
                    <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-between px-4 pb-4 gap-2">
                      <div className="w-full bg-orange-500/20 h-[30%] rounded-t"></div>
                      <div className="w-full bg-orange-500/30 h-[50%] rounded-t"></div>
                      <div className="w-full bg-orange-500/40 h-[40%] rounded-t"></div>
                      <div className="w-full bg-orange-500/60 h-[70%] rounded-t"></div>
                      <div className="w-full bg-orange-500 h-[85%] rounded-t shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/*<!-- Small Card 1 -->*/}
              <div className="rounded-xl border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
                <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                  <Salad></Salad>
                </div>
                <h3 className="text-xl font-bold mb-2">Lista de recetas</h3>
                <p className="text-muted-foreground text-sm">
                  Recomendación de recetas basadas en una meta.
                </p>
              </div>

              {/*<!-- Small Card 2 -->*/}
              <div className="rounded-xl border border-border bg-card p-8 group hover:border-primary/50 transition-colors">
                <div className="size-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500">
                  <ChartNoAxesGantt></ChartNoAxesGantt>
                </div>
                <h3 className="text-xl font-bold mb-2">Planes</h3>
                <p className="text-muted-foreground text-sm">
                  Lista de planes que te ayudan a cumplir con tu meta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/*<!-- CTA Section -->*/}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-verde-te/80 -z-10"></div>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Empieza a cuidarte hoy
            </h2>
            <p className="text-lg text-gris-oscuro max-w-2xl mx-auto mb-10">
              Únete a Vitamia para mejorar tu vida alimenticia. Es gratis
              empezar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-full bg-naranja text-white font-medium hover:bg-naranja/90 transition-all shadow-lg shadow-carbon-oscuro/20 flex items-center justify-center"
              >
                Crear cuenta gratis
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-lg">Vitamia</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Comprometidos con mejorar tus hábitos alimenticios.
              </p>
            </div>

            <div className="flex justify-between md:justify-start w-full md:w-auto gap-12">
              <div>
                <h4 className="font-bold mb-4">Producto</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/" className="hover:text-foreground">
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-foreground">
                      Recetas
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Compañía</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link to="/" className="hover:text-foreground">
                      Sobre nosotros
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="hover:text-foreground">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-gris-oscuro">
            &copy; {new Date().getFullYear()} Vitamia. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}