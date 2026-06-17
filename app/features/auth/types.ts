export interface IUserInfo {
  idUser: number;
  idRole: number;
  nameRole: string;
  nameUser: string;
  lastNameUser: string;
  codeUser: string;
  emailUser: string;
  phoneUser: string;
}

export interface LoginSuccess {
  user: IUserInfo;
  token: string;
}

export interface LoginError {
  success: false;
  message: string;
}

export type UserStore = {
  email: string;
  password: string;
};

export interface SignInResponse {
  success: boolean;
  message: string;
  access_token: string;
  value: IUserInfo;
}

export interface IResponseCurrentUser {
  success: boolean;
  value: IUserInfo;
}
