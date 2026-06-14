import { api } from "@/app/shared/api/axios";
import { ITypeOutputCreate, ITypeOutputUpdate } from "../types";

export const getAllTypeOutputs = async (page?: number) => {
  const response = await api.post("", {
    query: `
     query($page: Int){
        getAllTypeOutputs(page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllTypeOutputs;
};

export const getOneTypeOutputByID = async (idTypeOutput: number) => {
  const response = await api.post("", {
    query: `
     query($idTypeOutput: Int!){
        findOneTypeOutput(idTypeOutput: $idTypeOutput){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
          }
        }
      }
    `,
    variables: {
      idTypeOutput,
    },
  });
  return response.data.data.findOneTypeOutput;
};

export const createNewTypeOutput = async (
  infoTypeOutput: ITypeOutputCreate,
) => {
  const response = await api.post("", {
    query: `
      mutation($nameTypeOutput: String!){
        createTypeOutput(dataTypeOutput: {
          nameTypeOutput: $nameTypeOutput
        }){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
          }
        }
      }
    `,
    variables: {
      nameTypeOutput: infoTypeOutput.nameTypeOutput,
      descriptionTypeOutput: infoTypeOutput.descriptionTypeOutput,
    },
  });

  return response.data.data.createTypeOutput;
};

export const updateOneTypeOutput = async (
  infoTypeOutput: ITypeOutputUpdate,
) => {
  const response = await api.post("", {
    query: `
      mutation($idTypeTOutput: Int!, $nameTypeOutput: String!, $descriptionTypeOutput: String){
        updateTypeOutput(dataTypeOutput:{
          idTypeTOutput: $idTypeTOutput
          nameTypeOutput: $nameTypeOutput
          descriptionTypeOutput: $descriptionTypeOutput
        }){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
          }
        }
      }
    `,
    variables: {
      idTypeOutput: infoTypeOutput.idTypeOutput,
      nameTypeOutput: infoTypeOutput.nameTypeOutput,
      descriptionTypeOutput: infoTypeOutput.descriptionTypeOutput,
    },
  });

  return response.data.data.updateTypeOutput;
};

export const deleteOneTypeOutput = async (idTypeOutput: number) => {
  const response = await api.post("", {
    query: `
      mutation($idTypeOutput: Int!){
        deleteTypeOutput(idTypeOutput: $idTypeOutput){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
          }
        }
      }
    `,
    variables: {
      idTypeOutput,
    },
  });

  return response.data.data.deleteTypeOutput;
};
