import { Input } from "./ui/input";
import BgGrapes from "@/assets/grapes.svg";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, Navigate } from "react-router";
import { useState } from "react";
import type { RegisterFields } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export function Register() {
  const [redirect, setRedirect] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const { register: registerUser } = useAuth();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    trigger,
  } = useForm<RegisterFields>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      // Mapear los datos del formulario al formato del backend
      await registerUser({
        nombre: data.name,
        apellido: data.lastname,
        correo: data.email,
        contrasena: data.password,
        fecha_nacimiento: data.dateBirth,
        meta: data.goal,
        peso: parseFloat(data.weight),
        altura: parseFloat(data.height) / 100, // Convertir de cm a metros
      });

      Swal.fire({
        icon: "success",
        title: "Registro exitoso.",
        text: "Ya puedes iniciar sesión en la plataforma.",
      });
      setRedirect(true);
    } catch (error: unknown) {
      console.error("Error al registrar:", error);

      // Manejar diferentes tipos de errores
      let errorMessage = "Por favor, inténtalo de nuevo.";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          errorMessage = "El correo ya está registrado.";
        } else if (error.response?.status === 400) {
          errorMessage = error.response.data?.error || "Datos inválidos.";
        } else if (error.response?.status === 500) {
          errorMessage = "Error en el servidor. Intenta más tarde.";
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error al registrar tus datos.",
        text: errorMessage,
      });
    }
    reset();
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof RegisterFields)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["email", "password"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["name", "lastname", "dateBirth"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (redirect) return <Navigate to="/login"></Navigate>;

  return (
    <div className="relative flex flex-col gap-6 shadow-lg border border-turquesa/10 rounded-lg px-9 py-12 bg-white/50 overflow-hidden">
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
            Paso {currentStep} de {totalSteps}:{" "}
            {currentStep === 1
              ? "Credenciales de acceso"
              : currentStep === 2
              ? "Información personal"
              : "Datos físicos y objetivo"}
          </p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="flex gap-2">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 flex-1 rounded-full transition-all ${
              step <= currentStep ? "bg-turquesa" : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {/* Contenedor del carrusel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
          >
            {/* Step 1: Email and Password */}
            <div className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 gap-6 px-2 xl:min-w-md w-full mx-auto">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    type="email"
                    placeholder="carlos@example.com"
                    id="email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "El correo electrónico es requerido.",
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
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    type="password"
                    placeholder="********"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "La contraseña es requerida.",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres.",
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

            {/* Step 2: Personal Information */}
            <div className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 gap-6 px-2 xl:min-w-md w-full mx-auto">
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
                    <span className="text-sm text-red-700 ml-2" role="alert">
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
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "El apellido es requerido.",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <span className="text-sm text-red-700 ml-2" role="alert">
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
                    <span className="text-sm text-red-700 ml-2" role="alert">
                      {errors.dateBirth.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Physical Data and Goal */}
            <div className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 gap-6 px-2 xl:min-w-md w-full mx-auto pb-2">
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 70.5"
                    id="peso"
                    step="0.1"
                    {...register("weight", {
                      required: {
                        value: true,
                        message: "El peso es requerido.",
                      },
                      min: {
                        value: 20,
                        message: "El peso debe ser mayor a 20 kg.",
                      },
                      max: {
                        value: 300,
                        message: "El peso debe ser menor a 300 kg.",
                      },
                    })}
                  />
                  {errors.weight && (
                    <span className="text-sm text-red-700 ml-2" role="alert">
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
                      min: {
                        value: 50,
                        message: "La altura debe ser mayor a 50 cm.",
                      },
                      max: {
                        value: 250,
                        message: "La altura debe ser menor a 250 cm.",
                      },
                    })}
                  />
                  {errors.height && (
                    <span className="text-sm text-red-700 ml-2" role="alert">
                      {errors.height.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
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
                    <span className="text-sm text-red-700 ml-2" role="alert">
                      {errors.goal.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8 gap-4">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className={`flex items-center gap-2 cursor-pointer ${
              currentStep === 1 ? "invisible" : ""
            }`}
          >
            <ChevronLeft size={20} />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-turquesa text-white hover:bg-turquesa/90 flex items-center gap-2 ml-auto cursor-pointer"
            >
              Siguiente
              <ChevronRight size={20} />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-[var(--bg-naranja)] text-white rounded-lg px-6 py-2 cursor-pointer hover:bg-[var(--bg-naranja)]/90 ml-auto"
            >
              Registrar
            </Button>
          )}
        </div>
      </form>

      <p className="text-center text-sm mt-4">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="text-[var(--bg-turquesa)] underline hover:text-[var(--bg-turquesa)]/80"
        >
          Inicia sesión aquí.
        </Link>
      </p>
    </div>
  );
}
