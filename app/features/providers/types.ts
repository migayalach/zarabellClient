import { Order } from "@/app/helpers/filters.types";

export interface IProvider {
  idProvider: number;
  nameProvider: string;
  phoneProvider: string;
  emailProvider: string;
  stateProvider: boolean;
}

export type IProviderCreate = Omit<IProvider, "idProvider" | "stateProvider">;

export type IProviderUpdate = IProvider;

export interface IPaginationProvider {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorProvider {
  success: false;
  message: string;
}

export interface IApiResponseProvider<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface IResponseProviders {
  success: boolean;
  message: string;
  info: IPaginationProvider;
  results: IProvider[];
}

export interface IResponseProvider {
  success: boolean;
  message: string;
  value: IProvider;
}

export interface IFilterProviders {
  nameProvider?: string;
  phoneProvider?: string;
  stateProvider?: boolean;
  order?: Order;
}

export type TProviderActionWatch = "create" | "delete" | "update" | "filters";
