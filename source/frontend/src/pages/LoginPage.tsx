import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginFields } from "../types/index";

export const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      console.log("Datos enviados", data);
      alert(`Datos enviados...\n -> ${data}`);
    } catch (error) {
      console.log("Error al enviar los datos.", error);
    }

    reset();
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center px-12 sm:px-16">
      <div className=" flex rounded-xl shadow-2xl">
        <form
          action=""
          className="flex-1 flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16 my-6 p-8 sm:p-12 md:px-12 md:py-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 w-full max-w-[24rem]">
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 className="font-bold text-4xl text-[var(--bg-carbon-oscuro)]">
                Bienvenido
              </h1>
              <p className="text-[var(--bg-gris-oscuro)] text-center text-sm md:text-md">
                Registra su correo eletrónico y contraseña para acceder a la
                plataforma
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[var(--bg-carbon-oscuro)]"
                >
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  className="rounded-sm py-2 px-3 border border-[var(--bg-gris-oscuro)]/50 focus:outline-[var(--bg-gris-oscuro)]/50 w-full"
                  placeholder="Correo electrónico"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Correo electrónico requerido.",
                    },
                    pattern: {
                      value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                      message: "Correo inválido.",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-sm text-red-700 ml-2">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-[var(--bg-carbon-oscuro)]"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="rounded-sm py-2 px-3 border border-[var(--bg-gris-oscuro)]/50 focus:outline-[var(--bg-gris-oscuro)]/50 w-full"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña requerida.",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-red-700 ml-2">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--bg-naranja)] text-white rounded-sm px-7 py-3 cursor-pointer max-w-[24rem]"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};
