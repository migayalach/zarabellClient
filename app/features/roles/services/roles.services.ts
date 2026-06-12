import { api } from "@/app/shared/api/axios";

export const getAllRoles = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int) {
        getAllRole(page: $page) {
          info {
            count
            pages
            next
            prev
          }
          results {
            idRole
            nameRole
          }
        }
      }
    `,
    variables: {
      page,
    },
  });

  return response.data.getAllRole;
};

export const getOneRoleByID = async (idRole: number) => {
  const response = await api.post("", {
    query: `
      query ($idRole: Int!) {
        findOneRole(idRole: $idRole) {
          message
          value {
            idRole
            nameRole
          }
        }
      }
    `,
    variables: {
      idRole,
    },
  });

  return response.data.data.findOneRole;
};

export const createNewRole = async (infoRole: { nameRole: string }) => {
  const response = await api.post("", {
    query: `
      mutation($nameRole: String!) {
        createRole(dataRole: { nameRole: $nameRole }) {
          message
          value
        }
      }
    `,
    variables: {
      nameRole: infoRole.nameRole,
    },
  });

  return response.data.data.createRole;
};

export const updateOneRole = async (infoRole: {
  idRole: number;
  nameRole: string;
}) => {
  const response = await api.post("", {
    query: `
      mutation($idRole: Int!, $nameRole: String!) {
        updateRole(dataRole: { idRole: $idRole, nameRole: $nameRole }) {
          message
          value
        }
      }
    `,
    variables: {
      idRole: infoRole.idRole,
      nameRole: infoRole.nameRole,
    },
  });

  return response.data.data.updateRole;
};

export const deleteOneRole = async (idRole: number) => {
  const response = await api.post("", {
    query: `
      mutation($idRole: Int!) {
        deleteRole(idRole: $idRole) {
          message
          value
        }
      }
    `,
    variables: {
      idRole,
    },
  });

  return response.data.data.deleteRole;
};
