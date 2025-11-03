// 1. Importa Link de react-router-dom
import { Link } from "react-router-dom";
import { Input } from "./Input";

export function Login() {
  return (
    <div className="flex flex-col gap-6 shadow-lg border border-[var(--carbon-oscur)]/5 rounded-lg px-8 py-12">
      <h1 className="font-bold text-4xl text-[var(--bg-carbon-oscuro)]">
        Bienvenido
      </h1>

      <p className="text-base text-[var(--bg-gris-oscuro)]">
        Ingresa tu correo electrónico y contraseña para acceder a la plataforma
      </p>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Correo electrónico</label>
          <Input
            type="email"
            placeholder="Correo electrónico"
            id="email"
          ></Input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Contraseña</label>
          <Input type="password" placeholder="Contraseña" id="password"></Input>
        </div>
        <button className="bg-[var(--bg-naranja)] text-white rounded-lg px-3 py-2">
          Continuar
        </button>
      </div>

      <p className="text-center">
        ¿No tienes una cuenta?{" "}
        <Link to="/register" className="text-[var(--bg-turquesa)] underline">
          Crea una cuenta aquí.
        </Link>
      </p>
    </div>
  );
}
