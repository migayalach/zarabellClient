import { api } from "@/app/shared/api/axios";
import { IPriceHistoryCreate, IPriceHistoryUpdate } from "../types";

export const getAllPriceHistories = async (idInputRecord: number, page?: number) => {
  const response = await api.post("", {
    query: `
      query($idInputRecord: Int!, $page: Int){
        getAllPriceHistory(idInputRecord: $idInputRecord, page: $page){
          info {
            count
            pages
            next
            prev
          }
          results {
            idPriceHistory
            idInputRecord
            nameProduct
            priceBuyIRecord
            countIRecord
            dateStartHistory
            dateEndHistory
            unitPriceHistory
            quarterPriceHistory
            dozenPriceHistory
            mayorPriceHistory
            detailHistory
          }
        }
      }
    `,
    variables: {
      idInputRecord,
      page,
    },
  });
  return response.data.data.getAllPriceHistory;
};

export const createNewPriceHistory = async (data: IPriceHistoryCreate) => {
  const response = await api.post("", {
    query: `
      mutation($idInputRecord: Int!, $dateStartHistory: String!, $unitPriceHistory: Float!, $quarterPriceHistory: Float!, $dozenPriceHistory: Float!, $mayorPriceHistory: Float!, $detailHistory: String){
        createPriceHistory(dataPriceHistory: {
          idInputRecord: $idInputRecord
          dateStartHistory: $dateStartHistory
          unitPriceHistory: $unitPriceHistory
          quarterPriceHistory: $quarterPriceHistory
          dozenPriceHistory: $dozenPriceHistory
          mayorPriceHistory: $mayorPriceHistory
          detailHistory: $detailHistory
        }){
          success
          message
          value {
            idPriceHistory
            idInputRecord
            nameProduct
            priceBuyIRecord
            countIRecord
            dateStartHistory
            dateEndHistory
            unitPriceHistory
            quarterPriceHistory
            dozenPriceHistory
            mayorPriceHistory
            detailHistory
          }
        }
      }
    `,
    variables: {
      idInputRecord: data.idInputRecord,
      dateStartHistory: data.dateStartHistory,
      unitPriceHistory: data.unitPriceHistory,
      quarterPriceHistory: data.quarterPriceHistory,
      dozenPriceHistory: data.dozenPriceHistory,
      mayorPriceHistory: data.mayorPriceHistory,
      detailHistory: data.detailHistory,
    },
  });

  return response.data.data.createPriceHistory;
};

export const updateOnePriceHistory = async (data: IPriceHistoryUpdate) => {
  const response = await api.post("", {
    query: `
      mutation($idPriceHistory: Int!, $idInputRecord: Int!, $dateStartHistory: String!, $dateEndHistory: String!, $unitPriceHistory: Float!, $quarterPriceHistory: Float!, $dozenPriceHistory: Float!, $mayorPriceHistory: Float!, $detailHistory: String){
        updateOnePriceHistory(dataPriceHistory:{
          idPriceHistory: $idPriceHistory
          idInputRecord: $idInputRecord
          dateStartHistory: $dateStartHistory
          dateEndHistory: $dateEndHistory
          unitPriceHistory: $unitPriceHistory
          quarterPriceHistory: $quarterPriceHistory
          dozenPriceHistory: $dozenPriceHistory
          mayorPriceHistory: $mayorPriceHistory
          detailHistory: $detailHistory
        }){
          success
          message
          value {
            idPriceHistory
            idInputRecord
            nameProduct
            priceBuyIRecord
            countIRecord
            dateStartHistory
            dateEndHistory
            unitPriceHistory
            quarterPriceHistory
            dozenPriceHistory
            mayorPriceHistory
            detailHistory
          }
        }
      }
    `,
    variables: {
      idPriceHistory: data.idPriceHistory,
      idInputRecord: data.idInputRecord,
      dateStartHistory: data.dateStartHistory,
      dateEndHistory: data.dateEndHistory,
      unitPriceHistory: data.unitPriceHistory,
      quarterPriceHistory: data.quarterPriceHistory,
      dozenPriceHistory: data.dozenPriceHistory,
      mayorPriceHistory: data.mayorPriceHistory,
      detailHistory: data.detailHistory,
    },
  });
  
  return response.data.data.updateOnePriceHistory;
};
