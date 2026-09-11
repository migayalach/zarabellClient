"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentTOutput,
  selectTOutputsError,
  selectTOutputsInfo,
  selectTOutputsLoading,
  selectTOutputsResults,
  selectInfoActionTOutput,
} from "../store/typeOutput.selector";
import {
  clearCurrentTOutputData,
  createTOutput,
  deleteOneTOutputByID,
  getAllListTOutput,
  getTOutputByID,
  resetAllDataTOutput,
  updateOneTOutputByID,
  clearInfoAction,
  clearInfoTOutputError,
} from "../store/typeOutput.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { ITypeOutputCreate, ITypeOutputUpdate } from "../types";

export const useTOutputs = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectTOutputsInfo);
  const results = useAppSelector(selectTOutputsResults);
  const currentTOutput = useAppSelector(selectCurrentTOutput);
  const loading = useAppSelector(selectTOutputsLoading);
  const error = useAppSelector(selectTOutputsError);
  const action = useAppSelector(selectInfoActionTOutput);

  const getAllTOutputs = async (page?: number) => {
    const result = await dispatch(getAllListTOutput(page));
    return unwrapResult(result);
  };

  const getOneTOutput = async (idTypeOutput: number) => {
    const result = await dispatch(getTOutputByID(idTypeOutput));
    return unwrapResult(result);
  };

  const createNewTOutput = async (infoTypeOutput: ITypeOutputCreate) => {
    const result = await dispatch(createTOutput(infoTypeOutput));
    return unwrapResult(result);
  };

  const deleteOneTOutput = async (idTypeOutput: number) => {
    const result = await dispatch(deleteOneTOutputByID(idTypeOutput));
    return unwrapResult(result);
  };

  const updateOneTOutput = async (infoTypeOutput: ITypeOutputUpdate) => {
    const result = await dispatch(updateOneTOutputByID(infoTypeOutput));
    return unwrapResult(result);
  };

  const clearDataCurrentTOutput = () => {
    dispatch(clearCurrentTOutputData());
  };

  const resetDataTOutput = () => {
    dispatch(resetAllDataTOutput());
  };

  const clearErrorTOutput = () => {
    dispatch(clearInfoTOutputError());
  };

  const resetActionDataTOutput = () => {
    dispatch(clearInfoAction());
  };

  return {
    info,
    results,
    currentTOutput,
    loading,
    error,
    action,
    getAllTOutputs,
    getOneTOutput,
    createNewTOutput,
    deleteOneTOutput,
    updateOneTOutput,
    clearDataCurrentTOutput,
    resetDataTOutput,
    clearErrorTOutput,
    resetActionDataTOutput,
  };
};
