import { api } from "@/app/shared/api/axios";
import { IRecordICreate, IRecordIUpdate } from "../types";

export const getAllInputRecords = async (page?: number) => {
  const response = await api.post("", {
    query: `
      query($page: Int){
        getAllIRecords(page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idInputRecord
            idCategory
            idProduct
            idProvider
            nameProvider
            nameCategory
            nameProduct
            dateInputRecord
            expirationDateIRecord
            priceBuyIRecord
            countIRecord
            statusIRecord
          }
        }
      }
    `,
    variables: {
      page,
    },
  });
  return response.data.data.getAllIRecords;
};

export const getOneInputRecordByID = async (idInputRecord: number) => {
  const response = await api.post("", {
    query: `
      query($idInputRecord: Int!){
        findOneIRecord(idInputRecord: $idInputRecord){
          message
          value {
            idInputRecord
            idCategory
            idProduct
            idProvider
            nameCategory
            nameProduct
            nameProvider
            priceBuyIRecord
            statusIRecord
            dateInputRecord
            expirationDateIRecord
            countIRecord
          }
        }
      }
    `,
    variables: {
      idInputRecord,
    },
  });

  return response.data.data.findOneIRecord;
};

export const createNewInputRecord = async (data: IRecordICreate) => {
  const response = await api.post("", {
    query: `
      mutation($idProduct:Int!, $idProvider:Int!, $dateInputRecord:String!, $expirationDateIRecord:String!, $countIRecord:Int!, $priceBuyIRecord: Float!){
        createIRecord(dataInputRecord:{
          idProduct: $idProduct
          idProvider: $idProvider
          dateInputRecord: $dateInputRecord
          expirationDateIRecord: $expirationDateIRecord
          countIRecord: $countIRecord
          priceBuyIRecord: $priceBuyIRecord
        }){
          message
          value {
            idInputRecord
            idCategory
            idProduct
            idProvider
            nameProvider
            nameCategory
            nameProduct
            dateInputRecord
            expirationDateIRecord
            priceBuyIRecord
            countIRecord
            statusIRecord
          }
        }
      }
    `,
    variables: {
      idProduct: data.idProduct,
      idProvider: data.idProvider,
      dateInputRecord: data.dateInputRecord,
      expirationDateIRecord: data.expirationDateIRecord,
      countIRecord: data.countIRecord,
      priceBuyIRecord: data.priceBuyIRecord,
    },
  });

  return response.data.data.createIRecord;
};

export const updateOneInputRecord = async (data: IRecordIUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idInputRecord: Int!, $idProduct:Int!, $idProvider:Int!, $dateInputRecord:String!, $expirationDateIRecord:String!, $countIRecord:Int!, $priceBuyIRecord: Float!, $statusIRecord: Boolean){
        updateOneIRecord(dataInputRecord: {
          idInputRecord: $idInputRecord
          idProduct: $idProduct
          idProvider: $idProvider
          dateInputRecord: $dateInputRecord
          expirationDateIRecord: $expirationDateIRecord
          countIRecord: $countIRecord
          priceBuyIRecord: $priceBuyIRecord
          statusIRecord: $statusIRecord
        }){
          message
          value {
              idInputRecord
              idCategory
              idProduct
              idProvider
              nameProvider
              nameCategory
              nameProduct
              dateInputRecord
              expirationDateIRecord
              priceBuyIRecord
              countIRecord
              statusIRecord
          }
        }
      }
    `,
    variables: {
      idInputRecord: data.idInputRecord,
      idProduct: data.idProduct,
      idProvider: data.idProvider,
      dateInputRecord: data.dateInputRecord,
      expirationDateIRecord: data.expirationDateIRecord,
      countIRecord: data.countIRecord,
      priceBuyIRecord: data.priceBuyIRecord,
      statusIRecord: data.statusIRecord,
    },
  });

  return response.data.data.updateOneIRecord;
};

export const deleteOneInputRecord = async (idInputRecord: number) => {
  const response = await api.post("", {
    query: `
      mutation($idInputRecord: Int!){
        deleteIRecord(idInputRecord: $idInputRecord){
          message
          value {
            idInputRecord
            idCategory
            idProduct
            idProvider
            nameCategory
            nameProduct
            nameProvider
            priceBuyIRecord
            statusIRecord
            dateInputRecord
            expirationDateIRecord
            countIRecord
          }
        }
      }
    `,
    variables: {
      idInputRecord,
    },
  });

  return response.data.data.deleteIRecord;
};
