import React from "react";
import { useNavigate } from "react-router-dom";
import CtaIngredientsImg from "@/assets/cta-ingredients.png";
import { useAuth } from "@/hooks/useAuth";

export const CtaSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    navigate(isAuthenticated ? "/home" : "/register");
  };

  return (
    <section id="cta" className="w-full bg-[#FAFAF6] pb-16 md:pb-24">
      <div className="landing-container">
        <div className="bg-[#092D2A] rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-xl border border-white/5">
          {/* Left Column: Copy & Actions */}
          <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-6">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] bg-[#FF6E06] inline-block" />
                <span className="text-[10px] tracking-wider uppercase text-[#FFD1A3] font-medium">
                  EMPIEZA POR TI
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.08] tracking-tight">
                <span className="block text-[#FAFAF6]">Tu bienestar.</span>
                <span className="block text-[#FAFAF6]">Tu ritmo.</span>
                <span className="block text-[#FF6E06]">Tu momento.</span>
              </h2>

              {/* Subtitle */}
              <p className="text-[14px] leading-relaxed text-[#FAFAF6]/70 max-w-[360px]">
                Haz espacio para sentirte mejor. Nosotros te ayudamos a empezar.
              </p>
            </div>

            {/* CTA Button & Access Note */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 pt-4">
              <button
                onClick={handleStart}
                className="bg-[#FF6E06] text-[#123F40] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#FF8533] transition-all shadow-md active:scale-95 cursor-pointer text-center shrink-0"
              >
                Crear mi cuenta gratis
              </button>
              <span className="text-[12px] text-[#FAFAF6]/60">
                Un pequeño paso para un gran cambio.
              </span>
            </div>
          </div>

          {/* Right Column: Photography */}
          <div className="relative min-h-[320px] lg:min-h-[460px] w-full">
            <img
              src={CtaIngredientsImg}
              alt="Ingredientes frescos Vitamia"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Soft inner shadow/gradient connecting the sides on desktop */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#092D2A] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
