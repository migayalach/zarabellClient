import { RootState } from "@/app/store/store";

export const selectProvidersInfo = (state: RootState) => state.providers.info;
export const selectProvidersResults = (state: RootState) =>
  state.providers.results;
export const selectProvidersLoading = (state: RootState) =>
  state.providers.loading;
export const selectProvidersError = (state: RootState) => state.providers.error;
export const selectCurrentProvider = (state: RootState) =>
  state.providers.currentProvider;
