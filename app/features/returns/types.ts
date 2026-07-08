export interface IReturn {
  idReturn: number;
  idUser: number;
  nameUser: string;
  dateReturn: string;
  codeReturn: string;
}

export interface IReturnCreate {
  idUser: number;
  dateReturn: string;
  codeReturn: string;
}

export interface IReturnUpdate {
  idReturn: number;
  idUser: number;
  dateReturn: string;
  codeReturn: string;
}

export interface IPaginationReturn {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorReturn {
  message: string;
}

export interface IResponseReturn {
  message: string;
  info: IPaginationReturn;
  results: IReturn[];
}

export interface IResponseReturn {
  success: boolean;
  message: string;
  value: IReturn;
}

export type TActionReturn = "create" | "update" | "delete";
