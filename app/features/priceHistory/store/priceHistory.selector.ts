import { RootState } from "@/app/store/store";

export const selectPriceHistoriesInfo = (state: RootState) =>
  state.priceHistory.info;
export const selectPriceHistoryResults = (state: RootState) =>
  state.priceHistory.results;
export const selectPriceHistoryLoading = (state: RootState) =>
  state.priceHistory.loading;
export const selectPriceHistoryError = (state: RootState) =>
  state.priceHistory.error;
export const selectCurrentPriceHistory = (state: RootState) =>
  state.priceHistory.currentPriceHistory;
