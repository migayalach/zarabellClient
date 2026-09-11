import { RootState } from "@/app/store/store";

export const selectTOutputsInfo = (state: RootState) => state.typeOutputs.info;
export const selectTOutputsResults = (state: RootState) =>
  state.typeOutputs.results;
export const selectTOutputsLoading = (state: RootState) =>
  state.typeOutputs.loading;
export const selectTOutputsError = (state: RootState) =>
  state.typeOutputs.error;
export const selectCurrentTOutput = (state: RootState) =>
  state.typeOutputs.currentTOutput;
export const selectInfoActionTOutput = (state: RootState) =>
  state.typeOutputs.action;
