import { api } from "@/app/shared/api/axios";
import {
  IPassword,
  IResponseCurrentUser,
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

export const resetPassword = () => {};
