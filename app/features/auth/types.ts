export interface LoginInfo {
  fullNameUser: string;
  nitUser: string;
  numberPhoneUser: string;
  codeUser: string;
  emailUser: string;
}

export interface LoginSuccess {
  user: LoginInfo,
  token: string,
}

export interface LoginError {
  success: false;
  message: string;
}

export type UserStore = {
  email: string;
  password: string;
};
