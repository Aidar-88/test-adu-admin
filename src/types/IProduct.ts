import { IShop } from "./IShop";

export interface IProduct {
  id: number;
  brand_title: null | string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  rating: null | string;
  discount: number;
  sells: string;
  confirm: boolean;
  block: boolean;
}

export interface IOrderProducts {
  id: number;
  ordered: boolean;
  product: IProduct;
  qty: number;
  status: "CREATED" | "PAYMENT" | "SUCCESS" | "CANCELLED" | "ERROR";
  totalPrice: number;
}

export interface IProductResponse {
  products: IProduct[];
  count: number;
}

export interface IProductGetOne {
  brand: null | string;
  category: IProductGetOneCategory;
  confirm: boolean;
  discount: number;
  fullDesc: string;
  id: number;
  image: string;
  photos: IProductGetOnePhotos[];
  price: number;
  quantity: number;
  shop: IShop | null;
  smallDesc: string;
  specs: IProductGetOneSpecs[];
  title: string;
}

export interface IProductUpdateOne {
  id: number;
  title: string;
  discount: number;
  smallDesc: string;
  fullDesc: string;
  price: number;
}

export interface IProductGetOneCategory {
  id: number;
  name: string;
}

export interface IProductGetOneSpecs {
  id: number;
  title: { id: number; title: string };
  value: string;
}

export interface IProductGetOnePhotos {
  id: number;
  image: string;
}

export interface IProductGetOneResponse {
  avg: null;
  is_fav: boolean;
  product: IProductGetOne;
}

export interface IProductConfirmBody {
  productId: number;
  confirm: boolean;
}

export interface IProductGetOneTag {
  id: number;
  title: string;
  smallDesc: string;
  fullDesc: string;
  image: string;
  quantity: number;
  price: number;
  discount: number;
  confirm: boolean;
}
