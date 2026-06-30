"use client";

import { useAppDispatch } from "@/app/store/hooks";
import {
  clearCurrentOutputData,
  clearInfoOutputError,
  createOutput,
  deleteOneOutputByID,
  getAllOutput,
  getOutputByID,
  resetAllDataOutput,
  resetOutputCreateUpdateData,
  updateOneOutputByID,
} from "../store/outputsInventory.slice";

import { IOutputCreate, IOutputUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useOutputActions = () => {
  const dispatch = useAppDispatch();

  const getAllOutputs = async (page?: number) => {
    const result = await dispatch(getAllOutput({ page }));
    return unwrapResult(result);
  };

  const getOneOutputByID = async (idProduct: number) => {
    const result = await dispatch(getOutputByID(idProduct));
    return unwrapResult(result);
  };

  const createNewOutput = async (data: IOutputCreate) => {
    const result = await dispatch(createOutput(data));
    return unwrapResult(result);
  };

  const updateOutput = async (data: IOutputUpdate) => {
    const result = await dispatch(updateOneOutputByID(data));
    return unwrapResult(result);
  };

  const deleteOutput = async (idProduct: number) => {
    const result = await dispatch(deleteOneOutputByID(idProduct));
    return unwrapResult(result);
  };

  const clearCurrentOutput = () => {
    dispatch(clearCurrentOutputData());
  };

  const resetOutput = () => {
    dispatch(resetAllDataOutput());
  };

  const resetOutputActCreateUpdate = () => {
    dispatch(resetOutputCreateUpdateData());
  };

  const clearErrorOutput = () => {
    dispatch(clearInfoOutputError());
  };

  return {
    getAllOutputs,
    getOneOutputByID,
    createNewOutput,
    updateOutput,
    deleteOutput,
    clearCurrentOutput,
    resetOutput,
    resetOutputActCreateUpdate,
    clearErrorOutput,
  };
};
