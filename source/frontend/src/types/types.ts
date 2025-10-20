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