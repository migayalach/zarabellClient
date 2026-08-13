"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentReason,
  selectReasonsError,
  selectReasonsInfo,
  selectReasonsLoading,
  selectReasonsResults,
} from "../store/reason.selector";

import {
  clearCurrentReasonData,
  createReason,
  deleteOneReasonByID,
  getAllListReason,
  getReasonByID,
  resetAllDataReason,
  updateOneReasonByID,
} from "../store/reason.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { IReasonCreate, IReasonUpdate } from "../types";

export const useReasons = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectReasonsInfo);
  const results = useAppSelector(selectReasonsResults);
  const currentReason = useAppSelector(selectCurrentReason);
  const loading = useAppSelector(selectReasonsLoading);
  const error = useAppSelector(selectReasonsError);

  const getAllReasons = async (page?: number) => {
    const result = await dispatch(getAllListReason(page));
    return unwrapResult(result);
  };

  const getOneReason = async (idReason: number) => {
    const result = await dispatch(getReasonByID(idReason));
    return unwrapResult(result);
  };

  const createNewReason = async (infoReason: IReasonCreate) => {
    const result = await dispatch(createReason(infoReason));
    return unwrapResult(result);
  };

  const deleteOneReason = async (idReason: number) => {
    const result = await dispatch(deleteOneReasonByID(idReason));
    return unwrapResult(result);
  };

  const updateOneReason = async (infoReason: IReasonUpdate) => {
    const result = await dispatch(updateOneReasonByID(infoReason));
    return unwrapResult(result);
  };

  const clearDataCurrentReason = () => {
    dispatch(clearCurrentReasonData());
  };

  const resetDataReason = () => {
    dispatch(resetAllDataReason());
  };

  return {
    info,
    results,
    currentReason,
    loading,
    error,
    getAllReasons,
    getOneReason,
    createNewReason,
    deleteOneReason,
    updateOneReason,
    clearDataCurrentReason,
    resetDataReason,
  };
};
