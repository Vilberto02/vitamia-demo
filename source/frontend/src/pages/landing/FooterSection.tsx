import React from "react";
import VitamiaWordmark from "@/assets/vitamia-wordmark.svg";

export const FooterSection: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#E8EDE2] text-[#123F40] pt-16 pb-9">
      <div className="landing-container flex flex-col gap-12 md:gap-14">
        {/* Top: Brand Purpose + Navigation Columns */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
          {/* Brand Purpose */}
          <div className="max-w-[280px]">
            <h3 className="text-2xl md:text-[26px] font-normal leading-tight text-[#123F40]">
              Tu nutrición,<br />nuestro compromiso.
            </h3>
          </div>

          {/* Navigation Columns */}
          <div className="flex items-start gap-10 sm:gap-16 md:gap-20">
            {/* Column 1: Producto */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#63716A]">
                PRODUCTO
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px]">
                <li>
                  <button
                    onClick={() => scrollTo("producto")}
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer text-left"
                  >
                    Características
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("beneficios")}
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer text-left"
                  >
                    Recetas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("beneficios")}
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer text-left"
                  >
                    Planes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo("beneficios")}
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer text-left"
                  >
                    Progreso
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Vitamia */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#63716A]">
                VITAMIA
              </span>
              <ul className="flex flex-col gap-2.5 text-[13px]">
                <li>
                  <button
                    onClick={() => scrollTo("como-funciona")}
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer text-left"
                  >
                    Sobre nosotros
                  </button>
                </li>
                <li>
                  <a
                    href="mailto:hola@vitamia.app"
                    className="text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monumental Wordmark */}
        <div className="w-full flex items-center justify-center my-4 overflow-hidden select-none">
          <img
            src={VitamiaWordmark}
            alt="Vitamia"
            className="w-full h-auto object-contain opacity-95"
          />
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-[#123F40]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#63716A]">
          <span>© 2026 Vitamia. Todos los derechos reservados.</span>
          <div className="flex items-center gap-7">
            <span className="hover:text-[#123F40] transition-colors cursor-pointer">
              Privacidad
            </span>
            <span className="hover:text-[#123F40] transition-colors cursor-pointer">
              Términos
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
