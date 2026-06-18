import { api } from "@/app/shared/api/axios";
import { IUserCreate, IUserUpdate } from "../types";

export const getAllUsers = async (page?: number) => {
  const response = await api.post("", {
    query: `
    query GetAllUsers($page: Int) {
      getAllUsers(page: $page) {
        info {
          count
          pages
          next
          prev
        }
        results {
          idUser
          idRole
          nameRole
          nameUser
          lastNameUser
          emailUser
          phoneUser
          stateUser
        }
      }
    }
  `,
    variables: {
      page,
    },
  });

  return response.data.data.getAllUsers;
};

export const getOneUserByID = async (idUser: number) => {
  const response = await api.post("", {
    query: `
      query FindOneUser($idUser: Int!) {
        findOneUser(idUser: $idUser) {
          message
          value {
            idUser
            idRole
            nameRole
            nameUser
            lastNameUser
            emailUser
            phoneUser
            stateUser
          }
        }
      }
    `,
    variables: {
      idUser,
    },
  });

  return response.data.data.findOneUser;
};

export const createNewUser = async (infoUser: IUserCreate) => {
  const response = await api.post("", {
    query: `
      mutation(
        $idRole: Int!,
        $nameUser: String!,
        $lastNameUser: String!,
        $emailUser: String!,
        $phoneUser: String!
      ) {
        createUser(
          dataUser: {
            idRole: $idRole
            nameUser: $nameUser
            lastNameUser: $lastNameUser
            emailUser: $emailUser
            phoneUser: $phoneUser
          }
        ) {
          message
          value {
            idUser
            idRole
            nameRole
            nameUser
            lastNameUser
            emailUser
            phoneUser
            stateUser
          }
        }
      }
    `,
    variables: {
      idRole: infoUser.idRole,
      nameUser: infoUser.nameUser,
      lastNameUser: infoUser.lastNameUser,
      emailUser: infoUser.emailUser,
      phoneUser: infoUser.phoneUser,
    },
  });

  return response.data.data.createUser;
};

export const updateOneUser = async (infoUser: IUserUpdate) => {
  const response = await api.post("", {
    query: `
      mutation(
        $idUser: Int!,
        $idRole: Int!,
        $nameUser: String!,
        $lastNameUser: String!,
        $emailUser: String!,
        $phoneUser: String!,
        $stateUser: Boolean
      ) {
        updateOneUser(
          dataUser: {
            idUser: $idUser
            idRole: $idRole
            nameUser: $nameUser
            lastNameUser: $lastNameUser
            emailUser: $emailUser
            phoneUser: $phoneUser
            stateUser: $stateUser
          }
        ) {
          message
          value {
            idUser
            idRole
            nameRole
            nameUser
            lastNameUser
            emailUser
            phoneUser
            stateUser
          }
        }
      }
    `,
    variables: {
      idUser: infoUser.idUser,
      idRole: infoUser.idRole,
      nameUser: infoUser.nameUser,
      lastNameUser: infoUser.lastNameUser,
      emailUser: infoUser.emailUser,
      phoneUser: infoUser.phoneUser,
      stateUser: infoUser.stateUser,
    },
  });

  return response.data.data.updateOneUser;
};

export const deleteOneUser = async (idUser: number) => {
  const response = await api.post("", {
    query: `
      mutation($idUser: Int!) {
        deleteUser(idUser: $idUser) {
          message
          value {
            idUser
            idRole
            nameRole
            nameUser
            lastNameUser
            emailUser
            phoneUser
            stateUser
          }
        }
      }
    `,
    variables: {
      idUser,
    },
  });

  return response.data.data.deleteUser;
};
