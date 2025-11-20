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
  id: number,
  title: string,
  description: string,
}
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
}