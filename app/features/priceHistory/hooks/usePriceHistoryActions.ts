"use client";
import { useAppDispatch } from "@/app/store/hooks";
import {
  clearCurrentPriceHistoryData,
  createPriceHistory,
  getAllPriceHistoryByID,
  resetAllDataPriceHistory,
  updateOnePriceHistoryByID,
  resetCreateUpdateData,
  clearInfoPriceHistoryError,
  getMagazineProducts,
  resetMagazineData,
  getMagazineAllProducts,
  resetMagazinePDF,
} from "../store/priceHistory.slice";
import { IPriceHistoryCreate, IPriceHistoryUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const usePriceHistoryActions = () => {
  const dispatch = useAppDispatch();

  const getAllPriceHistory = async (idInputRecord: number, page?: number) => {
    const result = await dispatch(
      getAllPriceHistoryByID({
        idInputRecord,
        page,
      }),
    );
    return unwrapResult(result);
  };

  const getProductMagazine = async (page?: number) => {
    const result = await dispatch(getMagazineProducts({ page }));
    return unwrapResult(result);
  };

  const getMagazinePDF = async () => {
    const result = await dispatch(getMagazineAllProducts());
    return unwrapResult(result);
  };

  const createNewPriceHistory = async (data: IPriceHistoryCreate) => {
    const result = await dispatch(createPriceHistory(data));
    return unwrapResult(result);
  };

  const updatePriceHistory = async (data: IPriceHistoryUpdate) => {
    const result = await dispatch(updateOnePriceHistoryByID(data));
    return unwrapResult(result);
  };

  const clearCurrentPriceHistory = () => {
    dispatch(clearCurrentPriceHistoryData());
  };

  const resetPriceHistory = () => {
    dispatch(resetAllDataPriceHistory());
  };

  const resetMagazine = () => {
    dispatch(resetMagazineData());
  };

  const resetPDFMagazine = () => {
    dispatch(resetMagazinePDF());
  };

  const resetActionCreateUpdate = () => {
    dispatch(resetCreateUpdateData());
  };

  const clearErrorInfo = () => {
    dispatch(clearInfoPriceHistoryError());
  };

  return {
    getAllPriceHistory,
    getProductMagazine,
    createNewPriceHistory,
    updatePriceHistory,
    clearCurrentPriceHistory,
    resetPriceHistory,
    resetMagazine,
    resetActionCreateUpdate,
    clearErrorInfo,
    getMagazinePDF,
    resetPDFMagazine,
  };
};
