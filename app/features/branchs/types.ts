import { Order } from "@/app/helpers/filters.types";

export interface IBranchs {
  idBranch: number;
  nameBranch: string;
  address: string;
  phone: string;
  stateBranch: boolean;
}

export interface IBranchCreate {
  nameBranch: string;
  address: string;
  phone: string;
}

export interface IBranchUpdate {
  idBranch: number;
  nameBranch: string;
  address: string;
  phone: string;
  stateBranch: boolean;
}

export interface IPaginationBranch {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorBranch {
  message: string;
}

export interface IResponseBranchs {
  message: string;
  info: IPaginationBranch;
  results: IBranchs[];
}

export interface IResponseBranch {
  success: boolean;
  message: string;
  value: IBranchs;
}

export interface IFilterBranch {
  nameBranch?: string;
  stateBranch?: boolean;
  order?: Order;
}