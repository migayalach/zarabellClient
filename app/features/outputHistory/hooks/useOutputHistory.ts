"use client";

import { useAppSelector } from "@/app/store/hooks";

import {
  selectActionOH,
  selectCurrentoutputHistory,
  selectOutputHistoriesInfo,
  selectOutputHistoryError,
  selectOutputHistoryLoading,
  selectOutputHistoryResults,
  selectSuccessOH,
} from "../store/outputHistory.selector";

export const useOutputHistory = () => {
  const info = useAppSelector(selectOutputHistoriesInfo);
  const results = useAppSelector(selectOutputHistoryResults);
  const currentOutputHistory = useAppSelector(selectCurrentoutputHistory);
  const loading = useAppSelector(selectOutputHistoryLoading);
  const error = useAppSelector(selectOutputHistoryError);
  const success = useAppSelector(selectSuccessOH);
  const action = useAppSelector(selectActionOH);

  return {
    info,
    results,
    currentOutputHistory,
    loading,
    error,
    success,
    action,
  };
};
