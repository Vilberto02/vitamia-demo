import { Input } from "./input";

export function Register() {
  return (
    <div className="flex flex-col gap-6 shadow-lg border border-[var(--carbon-oscur)]/5 rounded-lg px-8 py-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-4xl text-[var(--bg-carbon-oscuro)]">
            Bienvenido
          </h1>
          <p className="text-base text-[var(--bg-gris-oscuro)] mt-2">
            Registra tus datos para crearte una cuenta dentro de la plataforma.
          </p>
        </div>

        <svg width="40" height="40" viewBox="0 0 100 100"></svg>
      </div>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="nombres">Nombres</label>
              <Input
                type="text"
                placeholder="Tus nombres"
                id="nombres"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="apellidos">Apellidos</label>
              <Input
                type="text"
                placeholder="Tus apellidos"
                id="apellidos"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
              <Input type="date" id="fechaNacimiento" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="peso">Peso (kg)</label>
              <Input type="number" placeholder="Ej: 70.5" id="peso" required />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="altura">Altura (cm)</label>
              <Input type="number" placeholder="Ej: 175" id="altura" required />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="objetivo">Meta u objetivo</label>
              <Input
                type="text"
                placeholder="Ej: Perder peso"
                id="objetivo"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Correo electrónico</label>
              <Input
                type="email"
                placeholder="tu@correo.com"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Contraseña</label>
              <Input
                type="password"
                placeholder="Crea una contraseña segura"
                id="password"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[var(--bg-naranja)] text-white rounded-lg px-3 py-2 mt-4 w-full"
        >
          Continuar
        </button>
      </form>

      <p className="text-center text-sm">
        En caso de tener una cuenta,{" "}
        <a href="/login" className="text-[var(--bg-turquesa)] underline">
          inicie sesión aquí.
        </a>
      </p>
    </div>
  );
}
