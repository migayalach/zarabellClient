"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectDashboardLoading,
  selectDashboardError,
  selectDashboardSuccess,
  selectDashboardBestSellers,
  selectDashboardLessSellers,
  selectDashboardNearExpiration,
  selectDashboardTodaySales,
  selectDashboardYesterdaySales,
  selectDashboardTotalProducts,
  selectDashboardTotalOutputsCurrentMonth,
  selectDashboardTotalLotsToExpiration,
} from "../store/dashboard.selector";
import {
  clearDashboardError,
  getDashboardInfo,
  resetInfoDashboard,
} from "../store/dashboard.slice";

export const useDashboard = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const error = useAppSelector(selectDashboardError);
  const success = useAppSelector(selectDashboardSuccess);

  const bestSellers = useAppSelector(selectDashboardBestSellers);
  const lessSellers = useAppSelector(selectDashboardLessSellers);
  const nearExpiration = useAppSelector(selectDashboardNearExpiration);

  const todaySales = useAppSelector(selectDashboardTodaySales);
  const yesterdaySales = useAppSelector(selectDashboardYesterdaySales);

  const totalProducts = useAppSelector(selectDashboardTotalProducts);
  const totalOutputsCurrentMonth = useAppSelector(
    selectDashboardTotalOutputsCurrentMonth,
  );
  const totalLotsToExpiration = useAppSelector(
    selectDashboardTotalLotsToExpiration,
  );

  const clearErrorDashboard = () => {
    dispatch(clearDashboardError());
  };

  const fetchDashboardInfo = () => {
    dispatch(getDashboardInfo());
  };

  const resetDashboardInfo = () => {
    dispatch(resetInfoDashboard());
  };

  return {
    loading,
    error,
    success,

    bestSellers,
    lessSellers,
    nearExpiration,

    todaySales,
    yesterdaySales,

    totalProducts,
    totalOutputsCurrentMonth,
    totalLotsToExpiration,

    clearErrorDashboard,
    fetchDashboardInfo,
    resetDashboardInfo,
  };
};
