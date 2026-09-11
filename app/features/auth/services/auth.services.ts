import { api } from "@/app/shared/api/axios";
import {
  IPassword,
  IRefreshTokenResponse,
  IResponseCurrentUser,
  ISignOut,
  IUpdateProfile,
  SignInResponse,
  UserStore,
} from "../types";

export const signInRequest = async (
  data: UserStore,
): Promise<SignInResponse> => {
  const response = await api.post("", {
    query: `
      mutation($emailUser: String!, $passwordUser: String!){
      singIn(userInfo:{
        emailUser: $emailUser
        passwordUser: $passwordUser
      }){
        success
        message
        access_token
        value {
          idUser
          idRole
          nameRole
          nameUser
          lastNameUser
          emailUser
          phoneUser
        }
      }
    }
    `,
    variables: {
      emailUser: data.email,
      passwordUser: data.password,
    },
  });

  if (response.data.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.singIn;
};

export const getCurrentInfoUser = async (): Promise<IResponseCurrentUser> => {
  const response = await api.post("", {
    query: `
     query {
      currentUser {
        success
        value {
          idUser
          idRole
          nameRole
          nameUser
          lastNameUser
          emailUser
          phoneUser
        }
      }
    }
    `,
  });

  return response.data.data.currentUser;
};

export const changePassword = async (data: IPassword) => {
  const response = await api.post("", {
    query: `
    mutation($currentPassword: String!, $newPassword: String!){
      changePassword(infoPassword:{
        currentPassword: $currentPassword
        newPassword: $newPassword
      }){
        success
        message
      }
    }
    `,
    variables: {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    },
  });

  return response.data.data.changePassword;
};

export const updateInfoUser = async (data: IUpdateProfile) => {
  const response = await api.post("", {
    query: `
      mutation($nameUser: String!, $lastNameUser: String!, $emailUser: String!,  $phoneUser: String!){
        updateCurrentProfile(infoProfile:{
          nameUser: $nameUser
          lastNameUser: $lastNameUser
          emailUser: $emailUser
          phoneUser: $phoneUser   
        }){
          success
          value {
              idUser
              idRole
              nameRole
              nameUser
              lastNameUser
              emailUser
              phoneUser
          }
        }
      }
    `,
    variables: {
      nameUser: data.nameUser,
      lastNameUser: data.lastNameUser,
      emailUser: data.emailUser,
      phoneUser: data.phoneUser,
    },
  });

  return response.data.data.updateCurrentProfile;
};

export const resetPasswordUser = async (idUser: number) => {
  const response = await api.post("", {
    query: `
     mutation($idUser: Int!){
      resetPassword(idUser: $idUser){
        success
      }
    }
    `,
    variables: {
      idUser,
    },
  });

  return response.data.data.resetPassword;
};

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  const response = await api.post("", {
    query: `
      mutation {
        refreshToken {
          access_token
          message
          success
          value {
            idUser
            idRole
            nameRole
            nameUser
            lastNameUser
            emailUser
            phoneUser
          }
        }
      }
    `,
  });

  return response.data.data.refreshToken;
};

export const signOut = async (): Promise<ISignOut> => {
  const response = await api.post("", {
    query: `
      mutation {
        signOut {
          success
          message
        }
      }
    `,
  });

  return response.data.data.signOut;
};

export const forgotPasswordRequest = async (
  emailUser: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.post("/graphql", {
    query: `
      mutation forgotPassword($emailUser: String!) {
        forgotPassword(emailUser: $emailUser) {
          success
          message
        }
      }
    `,
    variables: {
      emailUser,
    },
  });

  if (response.data.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.forgotPassword;
};

export const resetPasswordByEmail = async (
  token: string,
  password: string,
): Promise<{ success: boolean; message: string }> => {
  const response = await api.post("/graphql", {
    query: `
      mutation resetPasswordByUserFromEmail(
        $token: String!
        $password: String!
      ) {
        resetPasswordByUserFromEmail(
          token: $token
          password: $password
        ) {
          success
          message
        }
      }
    `,
    variables: {
      token,
      password,
    },
  });

  if (response.data.errors?.length) {
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.resetPasswordByUserFromEmail;
};
