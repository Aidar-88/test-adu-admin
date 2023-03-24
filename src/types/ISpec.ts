import { ISpecCategory } from "./ICategory";
import { IProductGetOneTag } from "./IProduct";

export interface ISpec {
  id: number;
  title: string;
  values: ISpecValue[];
  categories: ISpecCategory[];
}

export interface ICreateSpec {
  title: string;
}

export interface ISpecValue {
  id: number;
  value: string;
  products: IProductGetOneTag[];
}
interface IOneSpecValue {
  id: number;
  value: string;
}

export interface IOneSpec {
  id: number;
  title: string;
  values: IOneSpecValue[];
  categories: ISpecCategory[];
}

export interface IAddValueSpec {
  titleId: number;
  value: string;
}

export interface IAddCategorySpec {
  categoryId: number;
  specId: number;
}
