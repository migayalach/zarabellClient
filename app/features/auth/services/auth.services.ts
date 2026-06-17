import { api } from "@/app/shared/api/axios";
import { IResponseCurrentUser, SignInResponse, UserStore } from "../types";

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
