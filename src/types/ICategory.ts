export interface ICategory {
  id: number;
  name: string;
  children?: ICategory[];
}

export interface ISpecCategory {
  id: number;
  name: string;
}

export interface ICreateCategory {
  name: string;
  parentCategoryId?: number | "";
  sort: number;
  type: "product" | "service";
}

export interface IDeleteCategory {
  id?: number | "";
}
