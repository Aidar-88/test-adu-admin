import { IOrderProducts, IProduct } from "./IProduct";
import { IShop } from "./IShop";

export interface IOrder {
  id: number;
  apartment: string;
  building: string;
  city: string;
  phone: string;
  street: string;
  totalPrice: number;
  orderNo: null;
  products: IProduct[];
  shopOrders: IShopOrders[];
}

export interface IOrderResponse {
  payment: IOrder[];
  success: IOrder[];
  cancelled: IOrder[];
}

export interface IAllOrdersResponse {
  count: number;
  orders: IOrder[];
}

export interface IShopOrders {
  id: number;
  totalPrice: number;
  status: "CREATED" | "PAYMENT" | "SUCCESS" | "CANCELLED" | "ERROR";
  orderNo: null;
  products: IOrderProducts[];
  shop: IShop;
  createdAt: string;
}

export interface IOneOrderResponse {
  apartment: string;
  building: string;
  city: string;
  id: number;
  phone: string;
  createdAt: string;
  shopOrders: IShopOrders[];
  street: string;
  totalPrice: number;
}
