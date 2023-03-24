import { IBasket } from "./IBasket";
import { IRole } from "./IRole";
import { IShop } from "./IShop";

export interface IUser {
  id: number;
  blocked: boolean;
  avatar: string | null;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  roles: IRole[];
}

export interface ICreateUser {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
}

export interface IOneUser {
  id: number;
  blocked: boolean;
  activated: boolean;
  avatar: string | null;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  roles: IRole[];
  shops: IShop[];
  basket: IBasket | null;
}

export interface IUserRole {
  email: string;
  role: string;
}

export interface IUserList {
  id: number;
  avatar: null | string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: IRole[];
}

export interface IUsersResponse {
  count: number;
  users: IUserList[];
}
