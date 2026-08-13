"use client";

import { useAppSelector } from "@/app/store/hooks";

import {
  selectCurrentPriceHistory,
  selectPriceHistoriesInfo,
  selectPriceHistoryError,
  selectPriceHistoryLoading,
  selectPriceHistoryResults,
  selectSuccess,
  selectMagazineResults,
  selectMagazineInfoPDF,
  selectResultsMagazinePDF,
} from "../store/priceHistory.selector";

export const usePriceHistory = () => {
  const info = useAppSelector(selectPriceHistoriesInfo);
  const infoPDF = useAppSelector(selectMagazineInfoPDF);
  const results = useAppSelector(selectPriceHistoryResults);
  const resultsMagazine = useAppSelector(selectMagazineResults);
  const resultsPDF = useAppSelector(selectResultsMagazinePDF);
  const currentPriceHistory = useAppSelector(selectCurrentPriceHistory);
  const loading = useAppSelector(selectPriceHistoryLoading);
  const error = useAppSelector(selectPriceHistoryError);
  const success = useAppSelector(selectSuccess);

  return {
    info,
    infoPDF,
    results,
    resultsMagazine,
    resultsPDF,
    currentPriceHistory,
    loading,
    error,
    success,
  };
};
