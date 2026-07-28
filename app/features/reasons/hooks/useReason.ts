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

import { IReasonCreate, IReasonUpdate } from "../types";

export const useReasons = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectReasonsInfo);
  const results = useAppSelector(selectReasonsResults);
  const currentReason = useAppSelector(selectCurrentReason);
  const loading = useAppSelector(selectReasonsLoading);
  const error = useAppSelector(selectReasonsError);

  const getAllReasons = (page?: number) => {
    dispatch(getAllListReason(page));
  };

  const getOneReason = (idReason: number) => {
    dispatch(getReasonByID(idReason));
  };

  const createNewReason = (infoReason: IReasonCreate) => {
    dispatch(createReason(infoReason));
  };

  const deleteOneReason = (idReason: number) => {
    dispatch(deleteOneReasonByID(idReason));
  };

  const updateOneReason = (infoReason: IReasonUpdate) => {
    dispatch(updateOneReasonByID(infoReason));
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
