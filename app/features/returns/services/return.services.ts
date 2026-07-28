import { api } from "@/app/shared/api/axios";
import { IReturnCreate, IReturnUpdate } from "../types";

export const getAllReturns = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query{
        getAllReturns(page: 1){
          info {
            count
            pages
            next
            prev
          }
          results {
            idReturn
            idReturn
            nameUser
            codeReturn
            dateReturn
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllReturns;
};

export const getReturnByID = async (idReturn: number) => {
  const response = await api.post("", {
    query: `
      query {
        getOneReturnByID(idReturn: 1){
          success
          message
          value {
            idReturn
            idReturn
            nameUser
            codeReturn
            dateReturn
          }
        }
      }
    `,
    variables: { idReturn },
  });

  return response.data.data.getOneReturnByID;
};

export const createNewReturn = async (data: IReturnCreate) => {
  const response = await api.post("", {
    query: `
      mutation{
        createReturn(dataReturn:{
          idUser: 1
          codeReturn: ""
          dateReturn: ""
        }){
          success
          message
          value {
            idReturn
            idReturn
            nameUser
            codeReturn
            dateReturn
          }
        }
      }
    `,
    variables: {
      idUser: data.idUser,
      codeReturn: data.codeReturn,
      dateReturn: data.dateReturn,
    },
  });

  return response.data.data.createReturn;
};

export const updateOneReturn = async (data: IReturnUpdate) => {
  const response = await api.post("", {
    query: `
      mutation{
        updateReturn(dataReturn:{
          idReturn: 1
          idUser: 2
          codeReturn: ""
          dateReturn: ""
        }){
          success
          message
          value {
            idReturn
            idReturn
            nameUser
            codeReturn
            dateReturn
          }
        }
      }
    `,
    variables: {
      idReturn: data.idReturn,
      idUser: data.idUser,
      codeReturn: data.codeReturn,
      dateReturn: data.dateReturn,
    },
  });

  return response.data.data.updateReturn;
};

export const deleteOneReturn = async (idReturn: number) => {
  const response = await api.post("", {
    query: `
      mutation{
        deleteReturn(idReturn: 1){
          success
          message
          value {
            idReturn
            idReturn
            nameUser
            codeReturn
            dateReturn
          }
        }
      }
    `,
    variables: {
      idReturn,
    },
  });

  return response.data.data.deleteReturn;
};
