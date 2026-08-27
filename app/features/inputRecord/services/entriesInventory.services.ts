import { api } from "@/app/shared/api/axios";
import { IFilterRecordInput, IRecordICreate, IRecordIUpdate } from "../types";

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
          success
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
          success
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
          success
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
          success
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

export const filterInputRecord = async (
  filterRecordInput?: IFilterRecordInput,
  page?: number,
) => {
  const response = await api.post("", {
    query: `
      query filterInputRecords(
        $page: Int
        $idCategory: Int
        $idProduct: Int
        $idProvider: Int
        $dateInputRecordFrom: String
        $dateInputRecordTo: String
        $expirationDateFrom: String
        $expirationDateTo: String
        $stateInputRecord: Boolean
        $order: Order
      ) {
        filterInputRecords(
          page: $page
          filters: {
            idCategory: $idCategory
            idProduct: $idProduct
            idProvider: $idProvider
            dateInputRecordFrom: $dateInputRecordFrom
            dateInputRecordTo: $dateInputRecordTo
            expirationDateFrom: $expirationDateFrom
            expirationDateTo: $expirationDateTo
            stateInputRecord: $stateInputRecord
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
            idInputRecord
            idCategory
            idProduct
            idProvider
            nameProvider
            nameCategory
            nameProduct
            dateInputRecord
            expirationDateIRecord
            countIRecord
            priceBuyIRecord
            statusIRecord
          }
        }
      }
    `,
    variables: {
      page,
      idCategory: filterRecordInput?.idCategory || undefined,
      idProduct: filterRecordInput?.idProduct || undefined,
      idProvider: filterRecordInput?.idProvider || undefined,
      dateInputRecordFrom: filterRecordInput?.dateInputRecordFrom || undefined,
      dateInputRecordTo: filterRecordInput?.dateInputRecordTo || undefined,
      expirationDateFrom: filterRecordInput?.expirationDateFrom || undefined,
      expirationDateTo: filterRecordInput?.expirationDateTo || undefined,
      stateInputRecord: filterRecordInput?.stateInputRecord ?? undefined,
      order: filterRecordInput?.order ?? "ASC",
    },
  });
  return response.data.data.filterInputRecords;
};
