import { Order } from "@/app/helpers/filters.types";

export interface ICategory {
  idCategory: number;
  nameCategory: string;
  stateCategory: boolean;
}

export interface IPaginationCaterogy {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorCategory {
  success: false;
  message: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  results: T;
}
export interface IResponseCaterogies {
  success: boolean;
  message: string;
  info: IPaginationCaterogy;
  results: ICategory[];
}

export interface IResponseCategory {
  success: boolean;
  message: string;
  value: ICategory;
}

export interface IFilterCategory {
  nameCategory?: string;
  stateCategory?: boolean;
  order?: Order;
}