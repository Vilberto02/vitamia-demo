import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { RegisterRequest } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export function FormProfile({ onCancel }: { onCancel: () => void }) {
  const {user} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterRequest>({
    mode: "onSubmit",
    defaultValues: {
      nombre: user?.nombre,
      apellido: user?.apellido,
      correo: user?.correo,
      fecha_nacimiento: user?.fecha_nacimiento,
      peso: user?.peso,
      altura: user?.altura,
      meta: user?.meta
    },
  });


  const onSubmit: SubmitHandler<RegisterRequest> = async (data) => {
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
            {...register("nombre", {
              required: {
                value: true,
                message: "El nombre es requerido.",
              },
            })}
          />
          {errors.nombre && (
            <span className="text-sm text-red-700 ml-2">
              {errors.nombre.message}
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
            {...register("apellido", {
              required: {
                value: true,
                message: "El apellido es requerido.",
              },
            })}
          />
          {errors.apellido && (
            <span className="text-sm text-red-700 ml-2">
              {errors.apellido.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dateBirth">Fecha de nacimiento</Label>
          <Input
            type="date"
            id="dateBirth"
            {...register("fecha_nacimiento", {
              required: {
                value: true,
                message: "La fecha de nacimiento es requerida.",
              },
            })}
          />
          {errors.fecha_nacimiento && (
            <span className="text-sm text-red-700 ml-2">
              {errors.fecha_nacimiento.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="peso">Peso (kg)</Label>
          <Input
            type="number"
            placeholder="Ej: 70.5"
            id="peso"
            {...register("peso", {
              required: {
                value: true,
                message: "El peso es requerido.",
              },
            })}
          />
          {errors.peso && (
            <span className="text-sm text-red-700 ml-2">
              {errors.peso.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="altura">Altura (cm)</Label>
          <Input
            type="number"
            placeholder="Ej: 175"
            id="altura"
            {...register("altura", {
              required: {
                value: true,
                message: "La altura es requerida.",
              },
            })}
          />
          {errors.altura && (
            <span className="text-sm text-red-700 ml-2">
              {errors.altura.message}
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
            {...register("meta", {
              required: {
                value: true,
                message: "La meta es requerida.",
              },
            })}
          />
          {errors.meta && (
            <span className="text-sm text-red-700 ml-2">
              {errors.meta.message}
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
            {...register("correo", {
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
          {errors.correo && (
            <span className="text-sm text-red-700 ml-2">
              {errors.correo.message}
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
