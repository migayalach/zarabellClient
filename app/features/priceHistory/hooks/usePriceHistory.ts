"use client";

import { useAppSelector } from "@/app/store/hooks";

import {
  selectCurrentPriceHistory,
  selectPriceHistoriesInfo,
  selectPriceHistoryError,
  selectPriceHistoryLoading,
  selectPriceHistoryResults,
  selectSuccess,
} from "../store/priceHistory.selector";

export const usePriceHistory = () => {
  const info = useAppSelector(selectPriceHistoriesInfo);
  const results = useAppSelector(selectPriceHistoryResults);
  const currentPriceHistory = useAppSelector(selectCurrentPriceHistory);
  const loading = useAppSelector(selectPriceHistoryLoading);
  const error = useAppSelector(selectPriceHistoryError);
  const success = useAppSelector(selectSuccess);

  return {
    info,
    results,
    currentPriceHistory,
    loading,
    error,
    success,
  };
};
