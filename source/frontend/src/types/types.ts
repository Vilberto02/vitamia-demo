import type { LucideIcon } from "lucide-react";

export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterInfoFields = {
  name: string;
  lastname: string;
  number_document: string;
  number_phone: number;
  name_business: string;
  address: string;
  number_ruc: string;
};

export type RegisterCredentialFields = LoginFields & {
  confirm_password: string;
};

export type FormData = RegisterInfoFields & RegisterCredentialFields;

export interface SideBarItemType {
  id: string;
  name: string;
  Icon: LucideIcon;
}

export interface LogroType {
  id: number;
  title: string;
  description: string;
}

export type RecetaType = {
  id: number;
  title: string;
  description: string;
};
export type Recipe = {
  id: string;
  title: string;
  description: string;
  preparationTime: string;
  benefits?: string;
  ingredients?: string[];
  preparation?: string[];
};

export type RegisterFields = {
  name: string;
  lastname: string;
  dateBirth: string;
  weight: string;
  height: string;
  goal: string;
  email: string;
  password: string;
};

export type Plan = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  benefits?: string[];
  recipes?: string[];
  isUserPlan?: boolean;
};

export type MotivationalMessage = {
  id: string;
  message: string;
};

export interface DoughnutChartProps {
  labels: string[];
  values: number[];
  colors: string[];
}

export type Alimento = {
  id: number;
  foodId?: number;
  name: string;
  cantidad: number;
  unidad: unidadMedida;
};

export type NutrienteDetalle = {
  valor: number;
  unidad: string;
};

export type AlimentoInfo = {
  id: number;
  name: string;
  calorias: string;

  macronutrientes: {
    carbohidratos: NutrienteDetalle;
    proteinas: NutrienteDetalle;
    grasas: NutrienteDetalle;
  };

  micronutrientes: {
    id: string | number;
    name: string;
    value: string;
  }[];

  beneficios: string;
};

export type unidadMedida = {
  id: string;
  name: string;
};

// Authentication Types
export type User = {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  fecha_nacimiento: string;
  meta: string;
  peso: number;
  altura: number;
  imc: number;
  imagen: string | null;
};

export type AuthResponse = {
  mensaje: string;
  token: string;
  usuario: User;
};

export type LoginRequest = {
  correo: string;
  contrasena: string;
};

export type RegisterRequest = {
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  fecha_nacimiento: string;
  meta?: string;
  peso: number;
  altura: number;
};

// Plan Types
export type PlanReceta = {
  id: number;
  titulo: string;
  tiempo_preparacion: string;
  descripcion?: string;
  beneficios?: string;
  ingredientes?: string;
  procedimiento?: string;
  imagen?: string;
};

export type PlanCompleto = {
  id: number;
  nombre: string;
  informacion: string;
  descripcion: string;
  beneficios: string;
};

export type PlanUsuario = {
  id: number;
  fecha: string;
  plan: PlanCompleto;
};

// Recipe Types
export type TipoComida = {
  id: number;
  nombre: string;
};

export type RecetaCompleta = {
  id: number;
  titulo: string;
  tiempo_preparacion: string;
  descripcion: string;
  beneficios: string;
  ingredientes: string;
  procedimiento: string;
  imagen: string;
  tipo_comida: TipoComida;
};

export type RecetasPorTipo = {
  desayuno: RecetaCompleta[];
  almuerzo: RecetaCompleta[];
  cena: RecetaCompleta[];
  snack: RecetaCompleta[];
};

// Nutritional Information Types
export type InformacionNutricional = {
  id: number;
  titulo: string;
  descripcion: string;
  beneficio: string;
  imagen: string;
};

export type PrivateRouteProps = {
  children: React.ReactNode;
};
