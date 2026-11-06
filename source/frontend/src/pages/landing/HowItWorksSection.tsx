import React from "react";
import { Check } from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="como-funciona" className="w-full bg-[#FAFAF6] py-16 md:py-24">
      <div className="landing-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-12 md:mb-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#FF6E06] inline-block" />
              <span className="text-[10px] tracking-wider uppercase text-[#63716A] font-medium">
                CÓMO FUNCIONA
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal leading-[1.18] tracking-tight text-[#123F40]">
              Empezar es más fácil<br className="hidden sm:inline" /> de lo que crees.
            </h2>
          </div>
          <p className="text-[14px] leading-relaxed text-[#63716A] max-w-[320px]">
            Tres pasos para que comer bien<br className="hidden sm:inline" /> deje de ser un esfuerzo extra.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
          {/* Step 01 */}
          <div className="flex flex-col gap-6">
            {/* Visual Card */}
            <div className="bg-[#EAF0E4] p-6 rounded-2xl flex flex-col justify-center gap-3.5 h-[230px]">
              <span className="text-[12px] text-[#63716A] font-normal">
                ¿Qué quieres lograr?
              </span>

              {/* Tag Row 1 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#123F40] text-[#FAFAF6] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  <Check className="w-3 h-3 text-[#FFD1A3]" />
                  <span>Más energía</span>
                </span>
                <span className="bg-white text-[#123F40] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  Comer sano
                </span>
              </div>

              {/* Tag Row 2 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white text-[#123F40] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  Vegetariana
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#123F40] text-[#FAFAF6] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  <Check className="w-3 h-3 text-[#FFD1A3]" />
                  <span>15 min</span>
                </span>
                <span className="bg-white text-[#123F40] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  Sin lactosa
                </span>
              </div>

              {/* Tag Row 3 */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#123F40] text-[#FAFAF6] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  <Check className="w-3 h-3 text-[#FFD1A3]" />
                  <span>Bajo presupuesto</span>
                </span>
                <span className="bg-white text-[#123F40] text-[11px] px-3.5 py-1.5 rounded-full shadow-2xs font-normal">
                  Dormir mejor
                </span>
              </div>
            </div>

            {/* Step Number + Line */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-[#FF6E06]">01</span>
              <div className="flex-1 h-[1px] bg-[#123F40]/15" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[20px] font-medium text-[#123F40]">
                Cuéntanos sobre ti
              </h3>
              <p className="text-[13px] leading-relaxed text-[#63716A]">
                Define tus metas, gustos y el tiempo que tienes. Vitamia aprende de ti desde el primer día.
              </p>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col gap-6">
            {/* Visual Card */}
            <div className="bg-[#EAF0E4] p-6 rounded-2xl flex flex-col justify-between h-[230px]">
              {/* Recipe Mockup Card */}
              <div className="bg-white p-3 rounded-[14px] flex items-center gap-3.5 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1657012784624-c6ecc5031918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                  alt="Wrap de pollo"
                  className="w-12 h-12 rounded-[10px] object-cover shrink-0"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-[8px] font-semibold tracking-wider text-[#63716A] uppercase">
                    PARA TI - ALMUERZO
                  </span>
                  <span className="text-[13px] font-medium text-[#123F40] truncate">
                    Wrap de pollo y hummus
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6E06]" />
                    <span className="text-[10px] text-[#123F40] font-normal">
                      96% ideal para tu meta
                    </span>
                  </div>
                </div>
              </div>

              {/* Macros Row */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {/* Protein */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#63716A]">Proteína</span>
                    <span className="font-semibold text-[#123F40]">32 g</span>
                  </div>
                  <div className="w-full h-1 bg-[#123F40]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#123F40] rounded-full w-[75%]" />
                  </div>
                </div>

                {/* Carbs */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#63716A]">Carbos</span>
                    <span className="font-semibold text-[#123F40]">41 g</span>
                  </div>
                  <div className="w-full h-1 bg-[#123F40]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#123F40] rounded-full w-[60%]" />
                  </div>
                </div>

                {/* Fats */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#63716A]">Grasas</span>
                    <span className="font-semibold text-[#123F40]">14 g</span>
                  </div>
                  <div className="w-full h-1 bg-[#123F40]/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#123F40] rounded-full w-[40%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step Number + Line */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-[#FF6E06]">02</span>
              <div className="flex-1 h-[1px] bg-[#123F40]/15" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[20px] font-medium text-[#123F40]">
                Encuentra tu equilibrio
              </h3>
              <p className="text-[13px] leading-relaxed text-[#63716A]">
                Recibe recetas y planes pensados para tu rutina, tu presupuesto y lo que ya tienes en casa.
              </p>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col gap-6">
            {/* Visual Card */}
            <div className="bg-[#EAF0E4] p-6 rounded-2xl flex flex-col justify-between h-[230px]">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#123F40]">
                  Tu semana
                </span>
                <span className="text-[10px] font-semibold text-[#FF6E06]">
                  5 días seguidos
                </span>
              </div>

              {/* Days Columns */}
              <div className="grid grid-cols-7 gap-1.5">
                {[
                  { day: "L", active: true, orange: false },
                  { day: "M", active: true, orange: false },
                  { day: "M", active: true, orange: false },
                  { day: "J", active: true, orange: false },
                  { day: "V", active: true, orange: true },
                  { day: "S", active: false, orange: false },
                  { day: "D", active: false, orange: false },
                ].map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-full py-1 px-1 rounded-lg flex flex-col gap-1 items-center ${
                        col.active ? "bg-white shadow-2xs" : "bg-white/50"
                      }`}
                    >
                      <div
                        className={`w-full h-2 rounded-xs ${
                          col.active ? "bg-[#123F40]/25" : "bg-[#123F40]/10"
                        }`}
                      />
                      <div
                        className={`w-full h-3 rounded-xs ${
                          col.orange
                            ? "bg-[#FF6E06]"
                            : col.active
                            ? "bg-[#123F40]"
                            : "bg-[#123F40]/10"
                        }`}
                      />
                      <div
                        className={`w-full h-2 rounded-xs ${
                          col.active ? "bg-[#123F40]/25" : "bg-[#123F40]/10"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10px] ${
                        col.orange
                          ? "font-semibold text-[#FF6E06]"
                          : "font-normal text-[#63716A]"
                      }`}
                    >
                      {col.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Number + Line */}
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-semibold text-[#FF6E06]">03</span>
              <div className="flex-1 h-[1px] bg-[#123F40]/15" />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-[20px] font-medium text-[#123F40]">
                Hazlo parte de tu día
              </h3>
              <p className="text-[13px] leading-relaxed text-[#63716A]">
                Organiza tu semana, disfruta cada comida y mira cómo tus hábitos se vuelven naturales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
