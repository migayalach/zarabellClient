"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectInputRecordsError,
  selectInputRecordsLoading,
  selectInputRecordsResults,
} from "../store/entriesInventory.selector";
import { updateOneInputRecordByID } from "../store/entriesInventory.slice";
import { IRecordIUpdate } from "../types";

export const useUpdateInputRecords = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectInputRecordsResults);
  const loading = useAppSelector(selectInputRecordsLoading);
  const error = useAppSelector(selectInputRecordsError);

  const updateRecordInput = async (data: IRecordIUpdate) => {
    const result = await dispatch(updateOneInputRecordByID(data));
    return unwrapResult(result);
  };

  return {
    results,
    loading,
    error,
    updateRecordInput,
  };
};
