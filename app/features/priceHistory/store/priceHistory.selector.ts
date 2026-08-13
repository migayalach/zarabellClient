import { RootState } from "@/app/store/store";

export const selectPriceHistoriesInfo = (state: RootState) =>
  state.priceHistory.info;
export const selectMagazineInfoPDF = (state: RootState) =>
  state.priceHistory.infoMagazinePDF;
export const selectPriceHistoryResults = (state: RootState) =>
  state.priceHistory.results;
export const selectResultsMagazinePDF = (state: RootState) =>
  state.priceHistory.resultAllMagazinePDF;
export const selectMagazineResults = (state: RootState) =>
  state.priceHistory.resultsMagazine;
export const selectPriceHistoryLoading = (state: RootState) =>
  state.priceHistory.loading;
export const selectPriceHistoryError = (state: RootState) =>
  state.priceHistory.error;
export const selectCurrentPriceHistory = (state: RootState) =>
  state.priceHistory.currentPriceHistory;
export const selectSuccess = (state: RootState) => state.priceHistory.success;
