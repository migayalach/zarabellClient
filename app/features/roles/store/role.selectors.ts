import { RootState } from "@/app/store/store";

export const selectMonthPurchaseBuysResults = (state: RootState) =>
  state.monthPurchaseBuy.results;

export const selectMonthPurchaseBuysLoading = (state: RootState) =>
  state.monthPurchaseBuy.loading;

export const selectMonthPurchaseBuysError = (state: RootState) =>
  state.monthPurchaseBuy.error;
