import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unidadesMedida } from "./constants";
import { alimentoInfo } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const tagColorMap: Record<string, string> = {
  "Bajar de peso": "border-green-600 text-green-600",
  "Masa muscular": "border-yellow-600 text-yellow-600",
  Mediterránea: "border-amber-900 text-amber-900",
  "Bajo en azúcar": "border-teal-600 text-teal-600",
};

const defaultColor = "border-stone-500 text-stone-500";

export function getTagColorClass(tag: string) {
  return tagColorMap[tag] || defaultColor;
}

export const getUnidadById = (id: string) =>
  unidadesMedida.find((u) => u.id === id)!;

export const getNutritionalInfoById = (catalogId: number) => {
  return alimentoInfo.find((info) => info.id === catalogId);
};