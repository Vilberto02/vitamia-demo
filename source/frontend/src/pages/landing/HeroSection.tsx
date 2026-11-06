import React from "react";
import { useNavigate } from "react-router-dom";
import HeroFoodImg from "@/assets/hero-food.png";
import { ArrowDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    navigate(isAuthenticated ? "/home" : "/register");
  };

  const scrollToHowItWorks = () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#FAFAF6] pt-28 md:pt-36 pb-12 md:pb-20">
      <div className="landing-container">
        {/* Main Header / Message */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end gap-10 xl:gap-16 mb-12 md:mb-14">
          {/* Left: Tag + Headline */}
          <div className="min-w-0 flex flex-col gap-6 md:gap-7">
            {/* Tagline */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#FF6E06] inline-block" />
              <span className="text-[10px] tracking-wider uppercase text-[#63716A] font-medium">
                HECHO PARA TU VIDA UNIVERSITARIA
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.25rem,6.5vw,6rem)] font-normal leading-[1.05] tracking-tight font-sora">
              <span className="block text-[#123F40]">Comer bien.</span>
              <span className="block text-[#FF6E06]">Sentirte mejor.</span>
            </h1>
          </div>

          {/* Right: Promise & CTAs */}
          <div className="min-w-0 lg:max-w-[420px] lg:justify-self-end flex flex-col gap-7 pb-2">
            <p className="text-[15px] leading-relaxed text-[#63716A] font-normal">
              Tu nutrición, sin complicaciones. Recetas, planes y hábitos que se adaptan a ti,
              con la ayuda de inteligencia artificial.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={handleStart}
                className="bg-[#123F40] text-[#FAFAF6] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#092D2A] transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Comenzar gratis
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="flex items-center gap-1.5 text-[13px] text-[#123F40] hover:text-[#FF6E06] font-normal transition-colors cursor-pointer group"
              >
                <span>Cómo funciona</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Photography Frame */}
        <div className="w-full rounded-[20px] overflow-hidden shadow-sm aspect-4/3 sm:aspect-16/9 lg:aspect-21/10 max-h-[640px]">
          <img
            src={HeroFoodImg}
            alt="Comer saludable con Vitamia"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
