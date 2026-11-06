import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VitamiaLogo from "@/assets/vitamia-logo.svg";
import { useAuth } from "@/hooks/useAuth";

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStart = () => {
    navigate(isAuthenticated ? "/home" : "/register");
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAF6]/90 backdrop-blur-md border-b border-[#123F40]/10 shadow-xs"
          : "bg-[#FAFAF6]"
      }`}
    >
      <div className="landing-container py-5 md:py-7 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center" aria-label="Vitamia Inicio">
          <img
            src={VitamiaLogo}
            alt="Vitamia"
            className="h-6 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-9" aria-label="Navegación principal">
          <button
            onClick={() => scrollTo("como-funciona")}
            className="text-[13px] text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer"
          >
            Cómo funciona
          </button>
          <button
            onClick={() => scrollTo("beneficios")}
            className="text-[13px] text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer"
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollTo("producto")}
            className="text-[13px] text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer"
          >
            Características
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="text-[13px] text-[#123F40] hover:text-[#FF6E06] transition-colors cursor-pointer"
          >
            Preguntas frecuentes
          </button>
        </nav>

        {/* CTA and Login */}
        <div className="hidden xl:flex items-center gap-6">
          <Link
            to={isAuthenticated ? "/home" : "/login"}
            className="text-[13px] text-[#123F40] hover:text-[#FF6E06] transition-colors font-normal"
          >
            {isAuthenticated ? "Mi Cuenta" : "Iniciar sesión"}
          </Link>
          <button
            onClick={handleStart}
            className="bg-[#123F40] text-[#FAFAF6] text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-[#092D2A] transition-all cursor-pointer shadow-xs active:scale-95"
          >
            Empezar gratis
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="xl:hidden flex items-center gap-3">
          <button
            onClick={handleStart}
            className="bg-[#123F40] text-[#FAFAF6] text-xs font-semibold px-3.5 py-2 rounded-full"
          >
            Empezar
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#123F40] focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAFAF6] border-b border-[#123F40]/10 px-6 py-4 flex flex-col gap-4">
          <button
            onClick={() => scrollTo("como-funciona")}
            className="text-left text-sm text-[#123F40] py-1"
          >
            Cómo funciona
          </button>
          <button
            onClick={() => scrollTo("beneficios")}
            className="text-left text-sm text-[#123F40] py-1"
          >
            Beneficios
          </button>
          <button
            onClick={() => scrollTo("producto")}
            className="text-left text-sm text-[#123F40] py-1"
          >
            Características
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="text-left text-sm text-[#123F40] py-1"
          >
            Preguntas frecuentes
          </button>
          <div className="pt-2 border-t border-[#123F40]/10 flex flex-col gap-2">
            <Link
              to={isAuthenticated ? "/home" : "/login"}
              className="text-sm text-[#123F40] py-1"
            >
              {isAuthenticated ? "Mi Cuenta" : "Iniciar sesión"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
