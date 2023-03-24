export interface IBanner {
  id: number;
  type: "MAIN" | "MADEINKZ" | null;
  image: string;
  mobile_image: string;
  createdAt: string;
  deadline: string;
}

export interface ICreateNewBanner {
  shopId: number | null;
  type: "MAIN" | "MADEINKZ" | null;
  tagId: number | null;
  categoryId: number | null;
  file: File | null;
  file_mobile: File | null;
  day: number | null;
}

export interface IDeleteBanner {
  id: number;
}

export interface IBannerNew {
  photos: any;
}

export interface IBannerOneResponse {}
