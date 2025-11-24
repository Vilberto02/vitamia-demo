import VitamiaName from "@/assets/name-bg-vitamia.svg"
import { Link } from "react-router";

export function NotFoundPage() {
  return <div className="relative w-screen h-screen flex justify-center items-center px-12 sm:px-16 overflow-hidden bg-background-page">
    <div className="flex flex-col items-center justify-center gap-3">
      <p className="text-9xl font-bold">404</p>
      <p className="text-xl text-gris-oscuro text-center">Lo sentimos, la página que buscas no se encuentra.</p>
      <Link to="/" className="text-white px-4 py-3 rounded-xl cursor-pointer select-none bg-turquesa hover:bg-turquesa/80">Regresar</Link>
    </div>
    <img
        src={VitamiaName}
        alt="Nombre de Vitamia"
        className="absolute -bottom-15 left-1/2 -translate-x-1/2 z-0 pointer-events-none invisible md:visible"
      />
  </div>;
}
