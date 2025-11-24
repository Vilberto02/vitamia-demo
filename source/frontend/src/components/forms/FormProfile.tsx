import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { RegisterFields } from "@/types";
import { misDatos } from "@/mocks/mocks";

export function FormProfile({ onCancel }: { onCancel: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFields>({
    mode: "onSubmit",
    defaultValues: {
      name: misDatos.name,
      lastname: misDatos.lastname,
      email: misDatos.email,
      goal: misDatos.goal,
      height: misDatos.height,
      weight: misDatos.weight,
      dateBirth: misDatos.dateBirth,
      password: misDatos.password,
    },
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-1 xl:flex-row gap-6 w-full pr-3"
    >
      {/* Primera sección */}
      <div className="flex flex-col gap-6 flex-1">
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
      </div>
      {/* Segunda sección */}
      <div className="flex flex-col gap-6 flex-1">
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
        <div className="flex  gap-3">
          <Button
            type="submit"
            className="bg-turquesa hover:bg-turquesa/90 cursor-pointer"
          >
            Guardar Cambios
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
