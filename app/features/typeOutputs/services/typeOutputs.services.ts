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
            prefix
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
            prefix
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
      mutation($nameTypeOutput: String!, $descriptionTypeOutput: String!, $prefix: String!){
        createTypeOutput(dataTypeOutput: {
          nameTypeOutput: $nameTypeOutput
          descriptionTypeOutput: $descriptionTypeOutput
          prefix: $prefix
        }){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
            prefix
          }
        }
      }
    `,
    variables: {
      nameTypeOutput: infoTypeOutput.nameTypeOutput,
      descriptionTypeOutput: infoTypeOutput.descriptionTypeOutput,
      prefix: infoTypeOutput.prefix,
    },
  });

  return response.data.data.createTypeOutput;
};

export const updateOneTypeOutput = async (
  infoTypeOutput: ITypeOutputUpdate,
) => {
  console.log(infoTypeOutput);
  
  const response = await api.post("", {
    query: `
      mutation($idTypeTOutput: Int!, $nameTypeOutput: String!, $descriptionTypeOutput: String!, $prefix: String!){
        updateTypeOutput(dataTypeOutput:{
          idTypeTOutput: $idTypeTOutput
          nameTypeOutput: $nameTypeOutput
          descriptionTypeOutput: $descriptionTypeOutput
          prefix: $prefix
        }){
          message
          value {
            idTypeOutput
            nameTypeOutput
            descriptionTypeOutput
            prefix
          }
        }
      }
    `,
    variables: {
      idTypeTOutput: infoTypeOutput.idTypeOutput,
      nameTypeOutput: infoTypeOutput.nameTypeOutput,
      descriptionTypeOutput: infoTypeOutput.descriptionTypeOutput,
      prefix: infoTypeOutput.prefix
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
            prefix
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
