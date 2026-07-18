import { api } from "@/app/shared/api/axios";
import { IOutputHistoryCreate, IOutputHistoryUpdate } from "../types";

export const getAllOutputHistories = async (
  idOutput: number,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query($idOutput: Int!, $page: Int) {
        getAllOutputDetails(idOutput: $idOutput, page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idOutput
            idInputRecord
            nameProduct
            quantity
            totalPrice
          }
        }
      }
    `,
    variables: {
      idOutput,
      page,
    },
  });
  return response.data.data.getAllOutputDetails;
};

export const getOneOutputHistoryByID = async (
  idOutput: number,
  idInputRecord: number,
) => {
  const response = await api.post("", {
    query: `
      query($idOutput: Int!, $idInputRecord: Int!){
        getOneOutputDetailByID(idOutput: $idOutput, idInputRecord: $idInputRecord){
          success
          message
          value {
            idInputRecord
            idOutput
            nameProduct
            quantity
            totalPrice
          }
        }
      }
    `,
    variables: { idOutput, idInputRecord },
  });

  return response.data.data.getOneOutputDetailByID;
};

export const createNewOutputHistory = async (data: IOutputHistoryCreate) => {
  console.log(data);

  const response = await api.post("", {
    query: `
      mutation($idInputRecord: Int!, $idOutput: Int!, $quantity: Float!){
        createOutputDetail(dataDetailOutput: {
          idInputRecord: $idInputRecord
          idOutput: $idOutput
          quantity: $quantity
        }){
          success
          message
          value {
            idInputRecord
            idOutput
            nameProduct
            quantity
            totalPrice
          }
        }
      }
    `,
    variables: {
      idInputRecord: data.idInputRecord,
      idOutput: data.idOutput,
      quantity: data.quantity,
    },
  });
  console.log(response.data);

  return response.data.data.createOutputDetail;
};

export const updateOneOutputHistory = async (data: IOutputHistoryUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idInputRecord: Int!, $idOutput: Int!, $quantity: Float!){
        updateOneOutputDetail(dataDetailOutput: {
          idInputRecord: $idInputRecord
          idOutput: $idOutput
          quantity: $quantity
        }){
          success
          message
          value {
            idInputRecord
            idOutput
            nameProduct
            quantity
            totalPrice
          }
        }
      }
    `,
    variables: {
      idInputRecord: data.idInputRecord,
      idOutput: data.idOutput,
      quantity: data.quantity,
    },
  });

  return response.data.data.updateOneOutputDetail;
};

export const deleteOneOutputHistory = async (
  idOutput: number,
  idInputRecord: number,
) => {
  const response = await api.post("", {
    query: `
      mutation($idOutput: Int!, $idInputRecord: Int!){
        deleteOutputDetail(idOutput: $idOutput, idInputRecord: $idInputRecord){
          success
          message
          value {
            idInputRecord
            idOutput
            nameProduct
            quantity
            totalPrice
          }
        }
      }
    `,
    variables: {
      idOutput,
      idInputRecord,
    },
  });

  return response.data.data.deleteOutputDetail;
};
