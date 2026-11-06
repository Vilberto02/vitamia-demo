import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: "gratis",
    question: "¿Vitamia es gratis?",
    answer:
      "Sí. Puedes crear tu cuenta y usar las recetas, los planes y el seguimiento sin pagar nada.",
  },
  {
    id: "ia",
    question: "¿Cómo usa Vitamia la inteligencia artificial?",
    answer:
      "Nuestra IA analiza tus preferencias, metas e ingredientes disponibles para sugerir recetas balanceadas y planes a tu medida, optimizando tu tiempo y presupuesto.",
  },
  {
    id: "nutricionista",
    question: "¿Reemplaza a un nutricionista?",
    answer:
      "Vitamia es una herramienta de apoyo para organizar tu alimentación diaria y fomentar hábitos saludables. No sustituye la consulta médica ni el diagnóstico clínico personalizado.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(["gratis"]); // Question 1 open by default

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="w-full bg-[#FAFAF6] py-16 md:py-24">
      <div className="landing-container">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
          {/* Left: Heading & Contact */}
          <div className="lg:w-[380px] flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#FF6E06] inline-block" />
              <span className="text-[10px] tracking-wider uppercase text-[#63716A] font-medium">
                PREGUNTAS FRECUENTES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal leading-[1.18] tracking-tight text-[#123F40]">
              Antes de<br />empezar.
            </h2>
          </div>

          {/* Right: FAQ Accordion List */}
          <div className="flex-1 w-full max-w-[640px] flex flex-col divide-y divide-[#123F40]/10">
            {faqItems.map((item) => {
              const isOpen = openIds.includes(item.id);

              return (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-[17px] sm:text-[18px] transition-colors ${
                        isOpen
                          ? "font-medium text-[#123F40]"
                          : "font-normal text-[#123F40] group-hover:text-[#FF6E06]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "text-[#FF6E06]"
                          : "text-[#123F40] group-hover:text-[#FF6E06]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-3.5 pr-8 animate-fadeIn">
                      <p className="text-[14px] leading-relaxed text-[#63716A]">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
