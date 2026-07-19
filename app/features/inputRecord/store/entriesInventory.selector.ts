import { RootState } from "@/app/store/store";

export const selectInputRecordsInfo = (state: RootState) =>
  state.inputRecords.info;
export const selectInputRecordsResults = (state: RootState) =>
  state.inputRecords.results;
export const selectInputRecordsLoading = (state: RootState) =>
  state.inputRecords.loading;
export const selectInputRecordsError = (state: RootState) =>
  state.inputRecords.error;
export const selectCurrentInputRecord = (state: RootState) =>
  state.inputRecords.currentInputRecord;
export const selectSuccessInputRecord = (state: RootState) =>
  state.inputRecords.success;
export const selectActionInputRecord = (state: RootState) =>
  state.inputRecords.action;
