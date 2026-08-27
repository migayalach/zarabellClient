import { api } from "@/app/shared/api/axios";
import { IFilterUser, IUserCreate, IUserUpdate } from "../types";

export const getAllUsers = async (page?: number) => {
  const response = await api.post("", {
    query: `
    query getAllUsers($page: Int) {
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
      query findOneUser($idUser: Int!) {
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

export const filterUsers = async (
  filterUsers?: IFilterUser,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query filterUsers($page: Int, $idRol: Int, $nameUser: String, $emailUser: String, $stateUser: Boolean, $order: Order) {
        filterUsers(
          page: $page
          filters: {
            idRol: $idRol
            nameUser: $nameUser
            emailUser: $emailUser
            stateUser: $stateUser
            order: $order
          }
        ) {
          info {
            pages
            count
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
      idRol: filterUsers?.idRol || undefined,
      nameUser: filterUsers?.nameUser || undefined,
      emailUser: filterUsers?.emailUser || undefined,
      stateUser: filterUsers?.stateUser ?? undefined,
      order: filterUsers?.order ?? "ASC",
    },
  });

  return response.data.data.filterUsers;
};
