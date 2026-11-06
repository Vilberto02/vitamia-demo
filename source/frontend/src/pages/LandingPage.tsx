import React from "react";
import { Navbar } from "./landing/Navbar";
import { HeroSection } from "./landing/HeroSection";
import { BenefitsAccordionSection } from "./landing/BenefitsAccordionSection";
import { HowItWorksSection } from "./landing/HowItWorksSection";
import { ProductSection } from "./landing/ProductSection";
import { FaqSection } from "./landing/FaqSection";
import { CtaSection } from "./landing/CtaSection";
import { FooterSection } from "./landing/FooterSection";

export const LandingPage: React.FC = () => {
  return (
    <div className="[&_section[id]]:scroll-mt-28 min-h-screen bg-[#FAFAF6] text-[#123F40] font-sora antialiased selection:bg-[#FFD1A3] selection:text-[#123F40]">
      {/* 01. Navegación */}
      <Navbar />

      <main>
        {/* 02. Hero */}
        <HeroSection />

        {/* 03. Beneficios */}
        <BenefitsAccordionSection />

        {/* 04. Cómo funciona */}
        <HowItWorksSection />

        {/* 05. Producto */}
        <ProductSection />

        {/* 06. Preguntas frecuentes */}
        <FaqSection />

        {/* 07. CTA*/}
        <CtaSection />
      </main>

      {/* 08. Footer*/}
      <FooterSection />
    </div>
  );
};

export default LandingPage;
