import { IProduct, IProductGetOneTag } from "./IProduct";
export interface ITag {
  id: number;
  name: string;
  image: string;
  type: "FILTER" | "PROMOTION" | null;
  products: IProductGetOneTag[];
}

export interface ICreateNewTag {
  name: string | null;
  file: File | null;
  type: string | "FILTER" | "PROMOTION" | null;
}

export interface IAddProductTag {
  productId: number;
  tagId: number;
}
