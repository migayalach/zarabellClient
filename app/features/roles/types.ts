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
  message: string;
}

export interface IApiResponse<T> {
  message: string;
  results: T;
}
export interface IResponseRoles {
  message: string;
  info: IPaginationRole;
  results: IRole[];
}

export interface IResponseRole {
  message: string;
  value: IRole;
}

export type IClientSingleResponse = IApiResponse<IRole>;
