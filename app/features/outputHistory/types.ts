export interface IOutputHistory {
  idOutput: number;
  idInputRecord: number;
  nameProduct: string;
  quantity: number;
  totalPrice: number;
}

export interface IUserOutputData {
  nameUser: string;
  lastNameUser: string;
  nameTypeOutput: string;
  nameBranch: string;
  codeOutput: string;
  dateOutput: string;
}

export interface IDetailProductData {
  nameProvider: string;
  nameProduct: string;
  quantity: number;
  totalPrice: number;
}

export interface IListProductsData {
  userInfo: IUserOutputData;
  listProducts: IDetailProductData[];
}

export interface IResponseListProducts {
  success: boolean;
  message: string;
  value: IListProductsData;
}

export interface IOutputHistoryCreate {
  idOutput: number;
  idInputRecord: number;
  quantity: number;
}

export interface IOutputHistoryUpdate {
  idOutput: number;
  idInputRecord: number;
  quantity: number;
}

export interface IPaginationOutputHistory {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorOutputHistory {
  message: string;
}

export interface IResponseOutputHistories {
  message: string;
  info: IPaginationOutputHistory;
  results: IOutputHistory[];
}

export interface IResponseOutputHistory {
  success: boolean;
  message: string;
  value: IOutputHistory;
}

export type TActionOuputHistory = "create" | "update" | "delete";
