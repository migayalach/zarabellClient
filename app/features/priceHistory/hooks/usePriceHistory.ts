"use client";

import { useAppSelector } from "@/app/store/hooks";

import {
  selectCurrentPriceHistory,
  selectPriceHistoriesInfo,
  selectPriceHistoryError,
  selectPriceHistoryLoading,
  selectPriceHistoryResults,
} from "../store/priceHistory.selector";

export const usePriceHistory = () => {
  const info = useAppSelector(selectPriceHistoriesInfo);
  const results = useAppSelector(selectPriceHistoryResults);
  const currentPriceHistory = useAppSelector(selectCurrentPriceHistory);
  const loading = useAppSelector(selectPriceHistoryLoading);
  const error = useAppSelector(selectPriceHistoryError);

  return {
    info,
    results,
    currentPriceHistory,
    loading,
    error,
  };
};