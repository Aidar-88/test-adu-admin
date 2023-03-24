import { IOrder } from "./IOrder";

export interface IBasket {
  id: number;
  orders: IOrder[];
}
