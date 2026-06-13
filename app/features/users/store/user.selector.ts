import { RootState } from "@/app/store/store";

export const selectUsersInfo = (state: RootState) => state.users.info;
export const selectUsersResults = (state: RootState) => state.users.results;
export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersError = (state: RootState) => state.users.error;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;
export const selectInfoWatchUser = (state: RootState) => state.users.actionWatch;
