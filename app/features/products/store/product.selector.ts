import { RootState } from "@/app/store/store";

export const selectProductsInfo = (state: RootState) => state.products.info;
export const selectProductsResults = (state: RootState) => state.products.results;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectSuccesProductFlag = (state: RootState) => state.products.success;
