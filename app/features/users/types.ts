export interface IUserCreate {
  idRole: number;
  nameUser: string;
  lastNameUser: string;
  emailUser: string;
  phoneUser: string;
}

export interface IUserUpdate extends IUserCreate {
  idUser: number;
  stateUser: boolean;
}

export interface IUserInfo extends IUserCreate {
  idUser: number;
  idRole: number;
  nameRole: string;
  nameUser: string;
  lastNameUser: string;
  emailUser: string;
  phoneUser: string;
  stateUser: boolean;
}

export interface IPaginationUser {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface IErrorUser {
  success: false;
  message: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  results: T;
}
export interface IResponseUsers {
  success: boolean;
  message: string;
  info: IPaginationUser;
  results: IUserInfo[];
}

export interface IResponseUser {
  success: boolean;
  message: string;
  value: IUserInfo;
}

export type IClientSingleResponse = IApiResponse<IUserInfo>;

export type TUserActionWatch = "create" | "delete" | "update";
