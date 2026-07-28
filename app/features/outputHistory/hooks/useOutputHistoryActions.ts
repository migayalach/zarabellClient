"use client";

import { useAppDispatch } from "@/app/store/hooks";

import {
  clearCurrentOutputHistoryData,
  clearInfoOutputHistoryError,
  createOutputHistory,
  deleteOneOutputHistoryByID,
  getAllListOutputHistory,
  getOutputHistoryByID,
  resetAllDataOutputHistory,
  resetCreateUpdateOHData,
  updateOneOutputHistoryByID,
  getListProductsInfo,
  resetListProductsOutputs,
} from "../store/outputHistory.slice";

import { IOutputHistoryCreate, IOutputHistoryUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useOutputHistoryActions = () => {
  const dispatch = useAppDispatch();

  const getAllOutputHistory = async (idOutput: number, page?: number) => {
    const result = await dispatch(
      getAllListOutputHistory({
        idOutput,
        page,
      }),
    );
    return unwrapResult(result);
  };

  const getListProductsOutput = async (idOutput: number) => {
    const result = await dispatch(getListProductsInfo(idOutput));
    return unwrapResult(result);
  };

  const getByIDOutputHistory = async (
    idOutput: number,
    idInputRecord: number,
  ) => {
    const result = await dispatch(
      getOutputHistoryByID({
        idOutput,
        idInputRecord,
      }),
    );
    return unwrapResult(result);
  };

  const createNewOutputHistory = async (data: IOutputHistoryCreate) => {
    const result = await dispatch(createOutputHistory(data));
    return unwrapResult(result);
  };

  const updateOutputHistory = async (data: IOutputHistoryUpdate) => {
    const result = await dispatch(updateOneOutputHistoryByID(data));
    return unwrapResult(result);
  };

  const deleteOutputHistory = async (
    idOutput: number,
    idInputRecord: number,
  ) => {
    const result = await dispatch(
      deleteOneOutputHistoryByID({
        idOutput,
        idInputRecord,
      }),
    );
    return unwrapResult(result);
  };

  const clearCurrentOutputHistory = () => {
    dispatch(clearCurrentOutputHistoryData());
  };

  const resetOutputHistory = () => {
    dispatch(resetAllDataOutputHistory());
  };

  const resetActionCreateUpdate = () => {
    dispatch(resetCreateUpdateOHData());
  };

  const clearErrorInfo = () => {
    dispatch(clearInfoOutputHistoryError());
  };

  const resetListOutputProducts = () => {
    dispatch(resetListProductsOutputs());
  };

  return {
    getAllOutputHistory,
    getByIDOutputHistory,
    createNewOutputHistory,
    updateOutputHistory,
    deleteOutputHistory,
    clearCurrentOutputHistory,
    resetOutputHistory,
    resetActionCreateUpdate,
    clearErrorInfo,
    resetListOutputProducts,
    getListProductsOutput,
  };
};
