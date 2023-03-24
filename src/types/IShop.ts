import { IUser } from "./IUser";

export interface IShop {
  id: number;
  name: string;
  description: string;
  logo: string;
  legalAddress: string;
  legalCiry: string;
  bin_iin: string;
  instagram: string;
  phone: string;
  shop_type: string;
  owner: IUser;
  admin_users: IUser[];
  payment: boolean;
  confirm: boolean;
  view: boolean;
  block: boolean;
}

export interface IOneShopResponse {
  shop: IShop;
  rating: null | string;
}

export interface IShopResponse {
  shops: IShop[];
  count: number;
}

export interface ICreateNewShop {
  name: string;
  description: string;
  street: string;
  zipCode: number;
  legalCity: string;
  legalAddress: string;
  instagram: string;
  shop_type: string;
  phone: string;
  bin_iin: string;
  rate: string; //? че за RATE ?
}

export interface ICreateShop {
  name: string;
  bin_iin: string;
  legalAddress: string;

  description: string;
  street: string;
  zipCode: number;
  legalCity: string;
  instagram: string;
  shop_type: string;
  phone: string;
  rate: string; //? че за RATE ?
}

// Applications
export interface IShopApplication {
  id: number;
  title: string;
  bin_iin: string;
  address: string;
  contact_person: string;
  phone: number;
  email: string;
  instagram: string;
  shop_type: string;
}
