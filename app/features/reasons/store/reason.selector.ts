import { RootState } from "@/app/store/store";

export const selectReasonsInfo = (state: RootState) => state.reasons.info;
export const selectReasonsResults = (state: RootState) =>
  state.reasons.results;
export const selectReasonsLoading = (state: RootState) =>
  state.reasons.loading;
export const selectReasonsError = (state: RootState) => state.reasons.error;
export const selectCurrentReason = (state: RootState) =>
  state.reasons.currentReason;
