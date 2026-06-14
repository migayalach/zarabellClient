"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentTOutput,
  selectTOutputsError,
  selectTOutputsInfo,
  selectTOutputsLoading,
  selectTOutputsResults,
} from "../store/typeOutput.selector";
import {
  clearCurrentTOutputData,
  createTOutput,
  deleteOneTOutputByID,
  getAllListTOutput,
  getTOutputByID,
  resetAllDataTOutput,
  updateOneTOutputByID,
} from "../store/typeOutput.slice";

import { ITypeOutputCreate, ITypeOutputUpdate } from "../types";

export const useTOutputs = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectTOutputsInfo);
  const results = useAppSelector(selectTOutputsResults);
  const currentTOutput = useAppSelector(selectCurrentTOutput);
  const loading = useAppSelector(selectTOutputsLoading);
  const error = useAppSelector(selectTOutputsError);

  const getAllTOutputs = (page?: number) => {
    dispatch(getAllListTOutput(page));
  };

  const getOneTOutput = (idTypeOutput: number) => {
    dispatch(getTOutputByID(idTypeOutput));
  };

  const createNewTOutput = (infoTypeOutput: ITypeOutputCreate) => {
    dispatch(createTOutput(infoTypeOutput));
  };

  const deleteOneTOutput = (idTypeOutput: number) => {
    dispatch(deleteOneTOutputByID(idTypeOutput));
  };

  const updateOneTOutput = (infoTypeOutput: ITypeOutputUpdate) => {
    dispatch(updateOneTOutputByID(infoTypeOutput));
  };

  const clearDataCurrentTOutput = () => {
    dispatch(clearCurrentTOutputData());
  };

  const resetDataTOutput = () => {
    dispatch(resetAllDataTOutput());
  };

  return {
    info,
    results,
    currentTOutput,
    loading,
    error,
    getAllTOutputs,
    getOneTOutput,
    createNewTOutput,
    deleteOneTOutput,
    updateOneTOutput,
    clearDataCurrentTOutput,
    resetDataTOutput,
  };
};
