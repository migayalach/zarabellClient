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
} from "../store/priceHistory.slice";

import { IPriceHistoryCreate, IPriceHistoryUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const usePriceHistoryActions = () => {
  const dispatch = useAppDispatch();

  const getAllPriceHistory = async (idProduct: number, page?: number) => {
    const result = await dispatch(
      getAllPriceHistoryByID({
        idProduct,
        page,
      }),
    );
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

  const resetActionCreateUpdate = () => {
    dispatch(resetCreateUpdateData());
  };

  const clearErrorInfo = () => {
    dispatch(clearInfoPriceHistoryError());
  };

  return {
    getAllPriceHistory,
    createNewPriceHistory,
    updatePriceHistory,
    clearCurrentPriceHistory,
    resetPriceHistory,
    resetActionCreateUpdate,
    clearErrorInfo,
  };
};
