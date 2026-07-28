import { RootState } from "@/app/store/store";

export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;

export const selectDashboardError = (state: RootState) => state.dashboard.error;

export const selectDashboardSuccess = (state: RootState) =>
  state.dashboard.success;

export const selectDashboardBestSellers = (state: RootState) =>
  state.dashboard.bestSellers;

export const selectDashboardLessSellers = (state: RootState) =>
  state.dashboard.lessSellers;

export const selectDashboardNearExpiration = (state: RootState) =>
  state.dashboard.nearExpiration;

export const selectDashboardTodaySales = (state: RootState) =>
  state.dashboard.todaySales;

export const selectDashboardYesterdaySales = (state: RootState) =>
  state.dashboard.yesterdaySales;

export const selectDashboardTotalProducts = (state: RootState) =>
  state.dashboard.totalProducts;

export const selectDashboardTotalOutputsCurrentMonth = (state: RootState) =>
  state.dashboard.totalOutputsCurrentMonth;

export const selectDashboardTotalLotsToExpiration = (state: RootState) =>
  state.dashboard.totalLotsToExpiration;
