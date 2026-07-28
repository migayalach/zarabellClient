import { api } from "@/app/shared/api/axios";
import { IReasonCreate, IReasonUpdate } from "../types";

export const getAllReasons = async (page?: number) => {
  const response = await api.post("", {
    query: `
     query($page : Int){
        getAllReasonReturns(page: $page){
          info{
            count
            pages
            next
            prev
          }
          results{
            idReason
            nameReason
            descriptionReason
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllReasonReturns;
};

export const getOneReasonByID = async (idReasonReturn: number) => {
  const response = await api.post("", {
    query: `
     query($idReasonReturn: Int!){
        findOneReasonReturn(idReasonReturn: $idReasonReturn){
          message
          value {
            idReason
            nameReason
            descriptionReason
          }
        }
      }
    `,
    variables: {
      idReasonReturn,
    },
  });
  return response.data.data.findOneReasonReturn;
};

export const createNewReason = async (infoReason: IReasonCreate) => {
  const response = await api.post("", {
    query: `
      mutation($nameReason: String!, $descriptionReason: String){
        createReasonReturn(dataReasonReturn: {
          nameReason: $nameReason
          descriptionReason: $descriptionReason
        }){
          message
          value{
            idReason
            nameReason
            descriptionReason
          }
        }
      }
    `,
    variables: {
      nameReason: infoReason.nameReason,
      descriptionReason: infoReason.descriptionReason,
    },
  });

  return response.data.data.createReasonReturn;
};

export const updateOneReason = async (infoReason: IReasonUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idReason: Int!, $nameReason: String!, $descriptionReason: String!){
        updateReasonReturn(dataReasonReturn:{
          idReason: $idReason
          nameReason: $nameReason
          descriptionReason: $descriptionReason
        }){
          message
          value{
            idReason
            nameReason
            descriptionReason
          }
        }
      }
    `,
    variables: {
      idReason: infoReason.idReason,
      nameReason: infoReason.nameReason,
      descriptionReason: infoReason.descriptionReason,
    },
  });

  return response.data.data.updateReasonReturn;
};

export const deleteOneReason = async (idReasonReturn: number) => {
  const response = await api.post("", {
    query: `
     mutation($idReasonReturn : Int!){
      deleteReasonReturn(idReasonReturn: $idReasonReturn){
        message
        value {
          idReason
          nameReason
          descriptionReason
        }
      }
    }
    `,
    variables: {
      idReasonReturn,
    },
  });

  return response.data.data.deleteReasonReturn;
};
