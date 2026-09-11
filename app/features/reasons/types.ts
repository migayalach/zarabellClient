export interface IReason {
  idReason: number;
  nameReason: string;
  descriptionReason: string;
}

export type IReasonCreate = Omit<IReason, "idReason">;

export type IReasonUpdate = IReason;

export interface IPaginationReason {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorReason {
  success: false;
  message: string;
}

export interface IApiResponseReason<T> {
  success: boolean;
  message: string;
  results: T;
}

export interface IResponseReasons {
  success: boolean;
  message: string;
  info: IPaginationReason;
  results: IReason[];
}

export interface IResponseReason {
  success: boolean;
  message: string;
  value: IReason;
}

export type TActionTReason = "create" | "delete" | "update" | "filters";
