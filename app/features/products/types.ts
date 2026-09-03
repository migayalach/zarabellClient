import { Order } from "@/app/helpers/filters.types";

export interface IProduct {
  idProduct: number;
  idCategory: number;
  nameCategory: string;
  nameProduct: string;
  stateProduct: boolean;
}

export interface IProductCreate {
  idCategory: number;
  nameProduct: string;
}

export interface IProductUpdate {
  idProduct: number;
  idCategory: number;
  nameProduct: string;
  stateProduct: boolean;
}

export interface IPaginationProduct {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorProduct {
  success: false;
  message: string;
}

export interface IApiResponseProduct<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface IResponseProducts {
  success: boolean;
  message: string;
  info: IPaginationProduct;
  results: IProduct[];
}

export interface IResponseProduct {
  success: boolean;
  message: string;
  value: IProduct;
}

export interface IFilterProducts {
  idCategory?: number;
  nameCategory?: string;
  nameProduct?: string;
  stateProduct?: boolean;
  order?: Order;
}

export type TProductActionWatch = "create" | "delete" | "update" | "filters";
