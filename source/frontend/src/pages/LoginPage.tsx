import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginFields } from "../types/index";
import { Link, Navigate } from "react-router-dom";
import NameVitamia from "@/assets/name-bg-vitamia.svg"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Swal from "sweetalert2";

export const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginFields>({
    mode: "onChange",
  });
  const [redirect, setRedirect] = useState(false)

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      console.log("Datos enviados", data);
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso.",
        text: "Ya puedes acceder a la plataforma.",
      });
      setRedirect(true);
    } catch (error) {
      console.log("Error al enviar los datos.", error);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión.",
        text: "Por favor, inténtalo de nuevo.",
      });
    }

    reset();
  };

  if (redirect) return <Navigate to={"/home"}></Navigate>

  return (
    <main className="relative w-screen h-screen flex justify-center items-center px-12 sm:px-16 overflow-hidden bg-background-page" role="main">
      <div className="flex rounded-xl shadow-2xl bg-white">
        <form
          action=""
          aria-labelledby="login-title"
          className="flex-1 flex flex-col items-center justify-center sm:gap-12 lg:gap-8 my-2 p-12 md:px-12 md:py-14"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 w-full max-w-[24rem]">
            <div className="flex flex-col justify-center items-center gap-4">
              <h1 id="login-title" className="font-bold text-4xl text-carbon-oscuro">
                Bienvenido
              </h1>
              <p className="text-gris-oscuro text-center text-sm md:text-md">
                Registra su correo eletrónico y contraseña para acceder a la
                plataforma
              </p>
            </div>

            {/* Contenedor de los campos de entrada */}
            <div className="flex flex-col gap-6 w-full">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-carbon-oscuro"
                >
                  Correo electrónico
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="rounded-sm py-2 px-3 w-full"
                  placeholder="tu@gmail.com"
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
                  <span className="text-sm text-red-700 ml-2" role="alert">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-carbon-oscuro"
                >
                  Contraseña
                </Label>
                {/* border border-[var(--bg-gris-oscuro)]/50 focus:outline-[var(--bg-gris-oscuro)]/50 */}
                <Input
                  type="password"
                  id="password"
                  className="rounded-sm py-2 px-3  w-full"
                  placeholder="********"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Contraseña requerida.",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm text-red-700 ml-2" role="alert">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-naranja text-white rounded-sm cursor-pointer max-w-[24rem] py-5 xl:mt-0 mt-4"
          >
            Continuar
          </Button>
          <p className="text-center text-sm xl:mt-0 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="text-[var(--bg-turquesa)] underline"
            >
              Crea una cuenta aquí.
            </Link>
          </p>
        </form>
      </div>
      <img
        src={NameVitamia}
        alt="Nombre de Vitamia"
        className="absolute -bottom-15 left-1/2 -translate-x-1/2 z-0 pointer-events-none invisible md:visible"
      />
    </main>
  );
};
