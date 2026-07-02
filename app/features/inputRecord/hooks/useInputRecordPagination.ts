"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  selectInputRecordsInfo,
  selectInputRecordsError,
  selectInputRecordsLoading,
  selectInputRecordsResults,
} from "../store/entriesInventory.selector";
import { getAllListInputRecord } from "../store/entriesInventory.slice";

export const usePagInputRecords = () => {
  const dispatch = useAppDispatch();
  const info = useAppSelector(selectInputRecordsInfo);
  const results = useAppSelector(selectInputRecordsResults);
  const loading = useAppSelector(selectInputRecordsLoading);
  const error = useAppSelector(selectInputRecordsError);

  const pagRecordInput = async (page?: number) => {
    const result = await dispatch(getAllListInputRecord(page));
    return unwrapResult(result);
  };

  return {
    info,
    results,
    loading,
    error,
    pagRecordInput,
  };
};
