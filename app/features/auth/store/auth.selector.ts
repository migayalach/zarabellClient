import { RootState } from "@/app/store/store";

export const selectAuth = (state: RootState) => state.auth;

export const selectAuthUser = (state: RootState) => state.auth.info;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) =>
  !!state.auth.access_token;
