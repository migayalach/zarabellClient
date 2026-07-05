import { RootState } from "@/app/store/store";

export const selectOutputHistoriesInfo = (state: RootState) =>
  state.outputHistory.info;
export const selectOutputHistoryResults = (state: RootState) =>
  state.outputHistory.results;
export const selectOutputHistoryLoading = (state: RootState) =>
  state.outputHistory.loading;
export const selectOutputHistoryError = (state: RootState) =>
  state.outputHistory.error;
export const selectCurrentoutputHistory = (state: RootState) =>
  state.outputHistory.currentOutputHistory;
export const selectSuccessOH = (state: RootState) =>
  state.outputHistory.success;
export const selectActionOH = (state: RootState) => state.outputHistory.action;
