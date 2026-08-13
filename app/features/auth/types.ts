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

export interface IUpdateProfile {
  nameUser: string;
  lastNameUser: string;
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

export interface PasswordChangeSuccess {
  success: true;
  message: string;
}

export interface IPasswordInfo {
  currentPassword: string;
  newPassword: string;
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

export interface IPassword {
  currentPassword: string;
  newPassword: string;
}

export interface IRefreshTokenResponse {
  access_token: string;
  message: string;
  success: boolean;
  value: IUserInfo;
}

export interface ISignOut {
  success: boolean;
  message: string;
}
