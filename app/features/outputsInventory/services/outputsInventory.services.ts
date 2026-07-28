import { api } from "@/app/shared/api/axios";
import { IOutputCreate, IOutputUpdate } from "../types";

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
            nameTypeOutput
            nameUser
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
            idUser
            nameTypeOutput
            nameUser
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
      mutation($idUser: Int!, $idTypeOutput: Int!, $dateOutput: String!) {
        createOutput(dataOutput: {
          idUser: $idUser
          idTypeOutput: $idTypeOutput
          dateOutput: $dateOutput
        }){
          message
          success
          value {
            idOutput
            idTypeOutput
            idUser
            nameTypeOutput
            nameUser
            dateOutput
            codeOutput
          }
        }
      }
    `,
    variables: {
      idUser: infoOutput.idUser,
      idTypeOutput: infoOutput.idTypeOutput,
      dateOutput: infoOutput.dateOutput,
    },
  });
  return response.data.data.createOutput;
};

export const updateOneOutput = async (infoOutput: IOutputUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idOutput: Int!, $idTypeOutput: Int!, $idUser: Int!, $dateOutput: String!) {
        updateOutput(dataOutput: {
          idOutput: $idOutput
          idTypeOutput: $idTypeOutput
          idUser: $idUser
          dateOutput: $dateOutput
        }){
        message
        success
          value {
            idOutput
            idTypeOutput
            idUser
            nameTypeOutput
            nameUser
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
            nameTypeOutput
            nameUser
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
