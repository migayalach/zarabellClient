"use client";
import { useAppDispatch } from "@/app/store/hooks";
import {
  clearCurrentInputRecordData,
  clearInfoInputRecordError,
  createInputRecord,
  deleteOneInputRecordByID,
  getAllListInputRecord,
  getInputRecordByID,
  resetAllDataInputRecord,
  resetInputRecordCreateUpdateData,
  resetStateActionInputRecord,
  updateOneInputRecordByID,
  clearInfoWatch,
  inputRecordFilters,
} from "../store/entriesInventory.slice";

import { IFilterRecordInput, IRecordICreate, IRecordIUpdate } from "../types";
import { unwrapResult } from "@reduxjs/toolkit";

export const useInputRecordActions = () => {
  const dispatch = useAppDispatch();

  const getAllInputRecords = async (page?: number) => {
    const result = await dispatch(getAllListInputRecord(page));
    return unwrapResult(result);
  };

  const filterInputRecords = async (
    filters: IFilterRecordInput,
    page?: number,
  ) => {
    const result = await dispatch(inputRecordFilters({ filters, page }));
    return unwrapResult(result);
  };

  const getOneInputRecordByID = async (idInputRecord: number) => {
    const result = await dispatch(getInputRecordByID(idInputRecord));
    return unwrapResult(result);
  };

  const createNewInputRecord = async (data: IRecordICreate) => {
    const result = await dispatch(createInputRecord(data));
    return unwrapResult(result);
  };

  const updateInputRecord = async (data: IRecordIUpdate) => {
    const result = await dispatch(updateOneInputRecordByID(data));
    return unwrapResult(result);
  };

  const deleteInputRecord = async (idInputRecord: number) => {
    const result = await dispatch(deleteOneInputRecordByID(idInputRecord));
    return unwrapResult(result);
  };

  const clearCurrentInputRecord = () => {
    dispatch(clearCurrentInputRecordData());
  };

  const resetInputRecord = () => {
    dispatch(resetAllDataInputRecord());
  };

  const resetInputRecordActCreateUpdate = () => {
    dispatch(resetInputRecordCreateUpdateData());
  };

  const clearErrorInputRecord = () => {
    dispatch(clearInfoInputRecordError());
  };

  const resetInputRecordActionState = () => {
    dispatch(resetStateActionInputRecord());
  };

  const clearInfoWatchAction = () => {
    dispatch(clearInfoWatch());
  };

  return {
    getAllInputRecords,
    getOneInputRecordByID,
    createNewInputRecord,
    updateInputRecord,
    deleteInputRecord,
    clearCurrentInputRecord,
    resetInputRecord,
    resetInputRecordActCreateUpdate,
    clearErrorInputRecord,
    resetInputRecordActionState,
    filterInputRecords,
    clearInfoWatchAction,
  };
};
