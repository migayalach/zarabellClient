import { api } from "@/app/shared/api/axios";
import { IFilterOutputs, IOutputCreate, IOutputUpdate } from "../types";

export const getAllOutputs = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int){
        getAllOutputs(page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idOutput
            idTypeOutput
            idUser
            idBranch
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllOutputs;
};

export const getOneOutputByID = async (idOutput: number) => {
  const response = await api.post("", {
    query: `
      query($idOutput: Int!){
        getOneOutputByID(idOutput: $idOutput){
          success
          message
          value {
            idOutput
            idTypeOutput
            idBranch
            idUser
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      idOutput,
    },
  });
  return response.data.data.getOneOutputByID;
};

export const createNewOutput = async (infoOutput: IOutputCreate) => {
  const response = await api.post("", {
    query: `
      mutation($idUser: Int!, $idTypeOutput: Int!, $idBranch: Int!, $dateOutput: String!) {
        createOutput(dataOutput: {
          idUser: $idUser
          idTypeOutput: $idTypeOutput
          idBranch: $idBranch
          dateOutput: $dateOutput
        }){
          message
          success
          value {
            idOutput
            idTypeOutput
            idUser
            idBranch
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      idUser: infoOutput.idUser,
      idTypeOutput: infoOutput.idTypeOutput,
      idBranch: infoOutput.idBranch,
      dateOutput: infoOutput.dateOutput,
    },
  });
  return response.data.data.createOutput;
};

export const updateOneOutput = async (infoOutput: IOutputUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idOutput: Int!, $idTypeOutput: Int!, $idUser: Int!, $idBranch: Int!, $dateOutput: String!) {
        updateOutput(dataOutput: {
          idOutput: $idOutput
          idTypeOutput: $idTypeOutput
          idUser: $idUser
          idBranch: $idBranch
          dateOutput: $dateOutput
        }){
        message
        success
          value {
            idOutput
            idTypeOutput
            idUser
            idBranch
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      idOutput: infoOutput.idOutput,
      idTypeOutput: infoOutput.idTypeOutput,
      idUser: infoOutput.idUser,
      dateOutput: infoOutput.dateOutput,
    },
  });
  return response.data.data.updateOutput;
};

export const deleteOneOutput = async (idOutput: number) => {
  const response = await api.post("", {
    query: `
      mutation($idOutput: Int!) {
        deleteOutput(idOutput: $idOutput){
          message
          success
          value {
            idOutput
            idTypeOutput
            idUser
            idBranch
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      idOutput,
    },
  });
  return response.data.data.deleteOutput;
};

export const filterOutputs = async (
  filterOutputs?: IFilterOutputs,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query filterInputProducts(
        $page: Int
        $idBranch: Int
        $idTypeOutput: Int
        $idUser: Int
        $dateOutputFrom: String
        $dateOutputTo: String
        $order: Order
      ) {
        filterInputProducts(
          page: $page
          filters: {
            idBranch: $idBranch
            idTypeOutput: $idTypeOutput
            idUser: $idUser
            dateOutputFrom: $dateOutputFrom
            dateOutputTo: $dateOutputTo
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
            idOutput
            idUser
            idBranch
            idTypeOutput
            nameTypeOutput
            nameUser
            nameBranch
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      page,
      idBranch: filterOutputs?.idBranch || undefined,
      idTypeOutput: filterOutputs?.idTypeOutput || undefined,
      idUser: filterOutputs?.idUser || undefined,
      dateOutputFrom: filterOutputs?.dateOutputFrom || undefined,
      dateOutputTo: filterOutputs?.dateOutputTo || undefined,
      order: filterOutputs?.order ?? "ASC",
    },
  });
  return response.data.data.filterInputProducts;
};
