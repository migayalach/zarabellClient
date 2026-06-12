export interface IRole {
  idRole: number;
  nameRole: string;
}

export interface IPaginationRole {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorRole {
  success: false;
  message: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  results: T;
}
export interface IResponseRole {
  success: boolean;
  message: string;
  info: IPaginationRole;
  results: IRole[];
}

export interface IResponseRole {
  success: boolean;
  message: string;
  value: IRole;
}

export type IClientSingleResponse = IApiResponse<IRole>;
