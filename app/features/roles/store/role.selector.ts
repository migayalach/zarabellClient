import { RootState } from "@/app/store/store";

export const selectRolesInfo = (state: RootState) => state.roles.info;
export const selectRolesResults = (state: RootState) => state.roles.results;
export const selectRolesLoading = (state: RootState) => state.roles.loading;
export const selectRolesError = (state: RootState) => state.roles.error;
export const selectCurrentRole = (state: RootState) => state.roles.currentRole;
export const selectSuccesRoleFlag = (state: RootState) => state.roles.success;
