import { RootState } from "@/app/store/store";

export const selectCategoryInfo = (state: RootState) => state.categories.info;
export const selectCategoriesResults = (state: RootState) =>
  state.categories.results;
export const selectCategoryLoading = (state: RootState) =>
  state.categories.loading;
export const selectCategoryError = (state: RootState) => state.categories.error;
export const selectCurrentCategory = (state: RootState) =>
  state.categories.currentCategory;
export const selectActionCategory = (state: RootState) =>
  state.categories.action;
