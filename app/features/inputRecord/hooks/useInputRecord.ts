"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectInputRecordsError,
  selectInputRecordsLoading,
  selectCurrentInputRecord,
} from "../store/entriesInventory.selector";
import { getInputRecordByID } from "../store/entriesInventory.slice";

export const useInputRecordByID = () => {
  const dispatch = useAppDispatch();
  const currentInputRecord = useAppSelector(selectCurrentInputRecord);
  const loading = useAppSelector(selectInputRecordsLoading);
  const error = useAppSelector(selectInputRecordsError);

  const getRecordInputByID = async (idInputRecord: number) => {
    const result = await dispatch(getInputRecordByID(idInputRecord));
    return unwrapResult(result);
  };

  return {
    currentInputRecord,
    loading,
    error,
    getRecordInputByID,
  };
};
