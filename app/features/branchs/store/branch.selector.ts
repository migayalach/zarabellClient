import { RootState } from "@/app/store/store";

export const selectBranchsInfo = (state: RootState) => state.branchs.info;
export const selectBranchsResults = (state: RootState) => state.branchs.results;
export const selectBranchsLoading = (state: RootState) => state.branchs.loading;
export const selectBranchsError = (state: RootState) => state.branchs.error;
export const selectCurrentBranch = (state: RootState) =>
  state.branchs.currentBranch;
export const selectSuccessBranch = (state: RootState) => state.branchs.success;
export const selectActionBranch = (state: RootState) => state.branchs.action;
