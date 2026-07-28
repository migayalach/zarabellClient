"use client";

import { useAppSelector } from "@/app/store/hooks";
import {
  selectCurrentInputRecord,
  selectInputRecordsError,
  selectInputRecordsInfo,
  selectInputRecordsLoading,
  selectInputRecordsResults,
  selectSuccessInputRecord,
  selectActionInputRecord,
} from "../store/entriesInventory.selector";

export const useInputRecord = () => {
  const info = useAppSelector(selectInputRecordsInfo);
  const results = useAppSelector(selectInputRecordsResults);
  const currentInputRecord = useAppSelector(selectCurrentInputRecord);
  const loading = useAppSelector(selectInputRecordsLoading);
  const error = useAppSelector(selectInputRecordsError);
  const success = useAppSelector(selectSuccessInputRecord);
  const actionInputRecord = useAppSelector(selectActionInputRecord);

  return {
    info,
    results,
    currentInputRecord,
    loading,
    error,
    success,
    actionInputRecord,
  };
};
