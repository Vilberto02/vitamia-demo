import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardMockupImg from "@/assets/dashboard-mockup.png";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const ProductSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    navigate(isAuthenticated ? "/home" : "/register");
  };

  return (
    <section id="producto" className="w-full bg-[#123F40] text-[#FAFAF6] py-16 md:py-24">
      <div className="landing-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-12 md:mb-14">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#FF6E06] inline-block" />
              <span className="text-[10px] tracking-wider uppercase text-[#FFD1A3] font-medium">
                TU RUTINA, MÁS SIMPLE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-normal leading-[1.18] tracking-tight text-[#FAFAF6]">
              Cuida tus hábitos.<br className="hidden sm:inline" /> Disfruta tu día.
            </h2>
          </div>
          <p className="text-[14px] leading-relaxed text-[#FAFAF6]/70 max-w-[340px]">
            Tus recetas, planes y progreso, juntos.<br className="hidden sm:inline" />
            Dale a tu alimentación un espacio en tu día,<br className="hidden sm:inline" />
            no una complicación más.
          </p>
        </div>

        {/* Product Stage Card with subtle radial glow */}
        <div className="relative rounded-3xl p-4 sm:p-6 md:p-8 bg-[#0E3637] overflow-hidden shadow-2xl border border-white/5">
          {/* Radial Orange Glow at bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] pointer-events-none opacity-40 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at bottom, #FF6E06 0%, transparent 70%)",
            }}
          />

          {/* Browser Window Mockup */}
          <div className="relative z-10 bg-white rounded-t-xl sm:rounded-t-2xl shadow-xl overflow-hidden border border-[#E8EDE2]">
            {/* Browser Top Bar */}
            <div className="bg-[#F3F5EF] px-4 py-2.5 flex items-center justify-between border-b border-[#123F40]/10">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5 sm:w-16 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#123F40]/25" />
                <span className="w-2 h-2 rounded-full bg-[#123F40]/25" />
                <span className="w-2 h-2 rounded-full bg-[#123F40]/25" />
              </div>

              {/* URL Bar */}
              <div className="bg-white px-3.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] text-[#63716A] shadow-2xs">
                <Lock className="w-2.5 h-2.5 text-[#63716A]" />
                <span className="font-mono">app.vitamia.com/hoy</span>
              </div>

              {/* Spacer */}
              <div className="hidden sm:block w-16" />
            </div>

            {/* Dashboard Screenshot */}
            <div className="w-full bg-[#FAFAF6] flex items-center justify-center">
              <img
                src={DashboardMockupImg}
                alt="Panel de control Vitamia"
                className="block w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* 4 Feature Items Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 md:pt-14 border-t border-white/10 mt-12 md:mt-14">
          {/* Feature 01 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[17px] font-semibold text-[#FF6E06]">01</span>
            <h3 className="text-[16px] font-medium text-[#FAFAF6]">
              Recetas con lo que ya tienes
            </h3>
            <p className="text-[13px] text-[#FAFAF6]/60 leading-relaxed">
              Fotografía tu refri y recibe ideas al instante.
            </p>
          </div>

          {/* Feature 02 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[17px] font-semibold text-[#FF6E06]">02</span>
            <h3 className="text-[16px] font-medium text-[#FAFAF6]">
              Planes que se adaptan a tus metas
            </h3>
            <p className="text-[13px] text-[#FAFAF6]/60 leading-relaxed">
              Energía, rendimiento o simplemente comer mejor.
            </p>
          </div>

          {/* Feature 03 */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[17px] font-semibold text-[#FF6E06]">03</span>
            <h3 className="text-[16px] font-medium text-[#FAFAF6]">
              Todos tus hábitos en un lugar
            </h3>
            <p className="text-[13px] text-[#FAFAF6]/60 leading-relaxed">
              Comidas, agua y progreso, en una sola vista.
            </p>
          </div>

          {/* Feature 04: Free Access Callout */}
          <div className="flex flex-col gap-3 sm:border-l sm:border-white/10 sm:pl-6">
            <div className="flex flex-col">
              <span className="text-[34px] font-normal leading-none text-[#FAFAF6]">
                Gratis
              </span>
              <span className="text-[13px] text-[#FAFAF6]/60 mt-1">
                Empieza a tu ritmo, sin tarjeta.
              </span>
            </div>
            <button
              onClick={handleStart}
              className="bg-[#FF6E06] text-[#123F40] text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#FF8533] transition-all shadow-sm active:scale-95 cursor-pointer text-center"
            >
              Comenzar gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
