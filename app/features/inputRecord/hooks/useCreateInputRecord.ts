"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectInputRecordsError,
  selectInputRecordsLoading,
  selectInputRecordsResults,
} from "../store/entriesInventory.selector";
import { createInputRecord } from "../store/entriesInventory.slice";
import { IRecordICreate } from "../types";

export const useCreateInputRecords = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectInputRecordsResults);
  const loading = useAppSelector(selectInputRecordsLoading);
  const error = useAppSelector(selectInputRecordsError);

  const createRecordInput = async (data: IRecordICreate) => {
    const result = await dispatch(createInputRecord(data));
    return unwrapResult(result);
  };

  return {
    results,
    loading,
    error,
    createRecordInput,
  };
};
