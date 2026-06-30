import { RootState } from "@/app/store/store";

export const selectOutputInfo = (state: RootState) => state.outputs.info;
export const selectOutputResults = (state: RootState) => state.outputs.results;
export const selectOutputLoading = (state: RootState) => state.outputs.loading;
export const selectOutputError = (state: RootState) => state.outputs.error;
export const selectCurrentOutput = (state: RootState) =>
  state.outputs.currentOutput;
export const selectSuccessOutput = (state: RootState) => state.outputs.success;
