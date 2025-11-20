import { Input } from "./ui/input";
import BgGrapes from "@/assets/grapes.svg";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router";
import { useState } from "react";
import type { RegisterFields } from "@/types";

export function Register() {
  const [redirect, setRedirect] = useState<boolean>(false)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm<RegisterFields>({
    mode: "onSubmit"
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    console.log(data);
    setRedirect(true)
    reset();
  };

  if (redirect) return <Navigate to="/login"></Navigate>;

  return (
    <div className="relative flex flex-col gap-6 shadow-lg border border-turquesa/10 rounded-lg px-9 py-14 bg-white/50">
      <img
        src={BgGrapes}
        alt="Icono de Uvas"
        className="w-24 absolute top-0 right-0"
      />
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-bold text-4xl text-[var(--bg-carbon-oscuro)]">
            Bienvenido
          </h1>
          <p className="text-base text-[var(--bg-gris-oscuro)] mt-2">
            Registra tus datos para crearte una cuenta dentro de la plataforma.
          </p>
        </div>
      </div>

      <form
        className="grid grid-cols-2 grid-rows-5 gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Nombres</Label>
          <Input
            type="text"
            placeholder="Ej: Carlos Alberto"
            id="name"
            {...register("name", {
              required: {
                value: true,
                message: "El nombre es requerido.",
              },
            })}
          />
          {errors.name && (
            <span className="text-sm text-red-700 ml-2">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="goal">Meta u objetivo</Label>
          <Input
            type="text"
            placeholder="Ej: Perder peso"
            id="goal"
            {...register("goal", {
              required: {
                value: true,
                message: "La meta es requerida.",
              },
            })}
          />
          {errors.goal && (
            <span className="text-sm text-red-700 ml-2">
              {errors.goal.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Apellidos</Label>
          <Input
            type="text"
            placeholder="Ej: Vargas Llosa"
            id="lastname"
            required
            {...register("lastname", {
              required: {
                value: true,
                message: "El apellido es requerido.",
              },
            })}
          />
          {errors.lastname && (
            <span className="text-sm text-red-700 ml-2">
              {errors.lastname.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            type="email"
            placeholder="carlos@example.com"
            id="email"
            required
            {...register("email", {
              required: {
                value: true,
                message: "El correo eletrónico es requerido.",
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
        <div className="space-y-2">
          <Label htmlFor="dateBirth">Fecha de nacimiento</Label>
          <Input
            type="date"
            id="dateBirth"
            {...register("dateBirth", {
              required: {
                value: true,
                message: "La fecha de nacimiento es requerida.",
              },
            })}
          />
          {errors.dateBirth && (
            <span className="text-sm text-red-700 ml-2">
              {errors.dateBirth.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            type="password"
            placeholder="********"
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "La constraseña es requerida.",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-700 ml-2">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            type="number"
            placeholder="Ej: 70.5"
            id="peso"
            {...register("weight", {
              required: {
                value: true,
                message: "El peso es requerido.",
              },
            })}
          />
          {errors.weight && (
            <span className="text-sm text-red-700 ml-2">
              {errors.weight.message}
            </span>
          )}
        </div>
        <div></div>
        <div className="space-y-2">
          <Label htmlFor="altura">Altura (cm)</Label>
          <Input
            type="number"
            placeholder="Ej: 175"
            id="altura"
            {...register("height", {
              required: {
                value: true,
                message: "La altura es requerida.",
              },
            })}
          />
          {errors.height && (
            <span className="text-sm text-red-700 ml-2">
              {errors.height.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="bg-[var(--bg-naranja)] text-white rounded-lg px-3 py-2 self-end w-full cursor-pointer"
        >
          Continuar
        </Button>
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
