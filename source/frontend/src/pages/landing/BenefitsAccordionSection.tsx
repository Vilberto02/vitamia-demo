import React, { useState } from "react";
import AccordionAiImg from "@/assets/accordion-ai.png";
import { Sparkles, Plus, Minus } from "lucide-react";

interface AccordionItem {
  id: string;
  index: string;
  name: string;
  label: string;
  title: string;
  copy: string;
  tags: string[];
  image: string;
}

const items: AccordionItem[] = [
  {
    id: "recetario",
    index: "01",
    name: "Tu recetario",
    label: "INSPIRACIÓN EN CADA PLATO",
    title: "Recetas para cada día.",
    copy: "Encuentra inspiración para comer rico y equilibrado, según tus gustos y tus metas.",
    tags: ["A tu gusto", "Para cada día"],
    image: "https://images.unsplash.com/photo-1657012784624-c6ecc5031918?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTM5MzI3NjV8&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "recetas-ia",
    index: "02",
    name: "Recetas con IA",
    label: "COCINA CON LO QUE TIENES",
    title: "De tu cocina,\na algo increíble.",
    copy: "Transforma lo que tienes en casa en recetas saludables. Tú pones los ingredientes; Vitamia, la inspiración.",
    tags: ["Personalizado", "Sin complicaciones"],
    image: AccordionAiImg,
  },
  {
    id: "planes",
    index: "03",
    name: "Planes a tu medida",
    label: "TU SEMANA, EN EQUILIBRIO",
    title: "Un plan que va contigo.",
    copy: "Organiza tus comidas según tus metas, tus tiempos y tu forma de vivir.",
    tags: ["Tus metas", "Tu ritmo"],
    image: "https://images.unsplash.com/photo-1713366612356-eb1c612f7d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTM5MzI3NjV8&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "progreso",
    index: "04",
    name: "Tu progreso",
    label: "CADA PASO CUENTA",
    title: "Entiende tus hábitos.",
    copy: "Conecta tu alimentación con tu energía y concentración, y descubre tu propio equilibrio.",
    tags: ["Energía", "Bienestar"],
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NDM0ODN8MHwxfHJhbmRvbXx8fHx8fHx8fDE3OTM5MzI3NjV8&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export const BenefitsAccordionSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1); // Default to "Recetas con IA" (index 1)

  return (
    <section id="beneficios" className="w-full bg-[#FAFAF6] py-16 md:py-24">
      <div className="landing-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal leading-[1.18] tracking-tight text-[#123F40]">
            Tu bienestar,<br />a tu manera.
          </h2>
          <p className="text-[14px] leading-relaxed text-[#63716A] max-w-[340px]">
            Cuatro formas de cuidarte mejor.<br />
            Elige una y descubre lo que puedes hacer.
          </p>
        </div>

        {/* Accordion Cards Container */}
        <div
          className="flex flex-col md:flex-row gap-3 h-auto md:h-[440px] w-full"
          role="region"
          aria-label="Características y beneficios de Vitamia"
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,0.75,0.25,1)] group ${
                  isActive
                    ? "h-[420px] md:h-full min-w-0 md:flex-[4] shadow-md"
                    : "h-[84px] md:h-full min-w-0 md:flex-1 bg-[#B8C6AE]"
                }`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#092D2A]/90 via-[#092D2A]/20 to-transparent pointer-events-none" />

                {/* Card Index */}
                <span className="absolute top-4 left-4 text-[14px] font-medium text-white/90 z-10">
                  {item.index}
                </span>

                {/* Inactive State: Vertical Title */}
                <div
                  className={`absolute transition-opacity duration-300 z-10 pointer-events-none ${
                    isActive ? "opacity-0 invisible" : "opacity-100 visible"
                  } left-14 bottom-7 md:left-5 md:bottom-20`}
                >
                  <span className="text-[15px] md:text-[17px] font-medium text-white whitespace-nowrap block md:[writing-mode:vertical-rl] md:rotate-180">
                    {item.name}
                  </span>
                </div>

                {/* Inactive State: Plus Button Indicator */}
                {!isActive && (
                  <div className="absolute right-4 bottom-6 md:left-4 md:bottom-4 w-[34px] h-[34px] rounded-full bg-[#FAFAF6]/20 backdrop-blur-xs flex items-center justify-center text-white text-lg z-10 transition-colors group-hover:bg-[#FAFAF6]/30">
                    <Plus className="w-4 h-4" />
                  </div>
                )}

                {/* Active State: Badge */}
                {isActive && (
                  <div className="absolute top-4 left-12 flex items-center gap-1.5 bg-[#FAFAF6] text-[#123F40] px-3 py-1.5 rounded-full text-[10px] font-medium z-10 shadow-xs animate-fadeIn">
                    <Sparkles className="w-3 h-3 text-[#FF6E06]" />
                    <span>{item.name}</span>
                  </div>
                )}

                {/* Active State: Minus Control Button */}
                {isActive && (
                  <div className="absolute right-4 top-4 md:right-5 md:bottom-5 md:top-auto w-[34px] h-[34px] rounded-full bg-[#FF6E06] text-[#123F40] flex items-center justify-center font-bold z-20 shadow-sm transition-transform active:scale-90">
                    <Minus className="w-4 h-4" />
                  </div>
                )}

                {/* Active State: Details Glass Card */}
                {isActive && (
                  <div className="absolute left-4 bottom-4 md:left-5 md:bottom-5 right-4 md:right-5 max-w-[336px] bg-[#FAFAF6]/95 backdrop-blur-md p-5 md:p-[22px] rounded-xl shadow-lg z-10 border border-white/40 animate-slideUp">
                    <span className="text-[9px] font-semibold tracking-wider text-[#63716A] uppercase block mb-2">
                      {item.label}
                    </span>
                    <h3 className="text-xl md:text-[28px] font-normal leading-[1.15] text-[#123F40] tracking-tight mb-2.5 whitespace-pre-line">
                      {item.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-[#63716A] mb-3">
                      {item.copy}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] bg-[#E8EDE2] text-[#123F40] px-2.5 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-[13px] text-[#63716A] mt-5 text-center md:text-left">
          Cada pilar pensado para integrarse a tu rutina.
        </p>
      </div>
    </section>
  );
};
