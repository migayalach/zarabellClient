"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getMonthPurchaseBuys } from "../store/role.slice";
import { MonthBuyData } from "../types";

export const useMonthPBuys = () => {
  const dispatch = useAppDispatch();
  const purchaseBuy = useAppSelector((state) => state.monthPurchaseBuy);

  const getMonthPB = (data: MonthBuyData) => {
    dispatch(getMonthPurchaseBuys(data));
  };

  return {
    getMonthPB,
    loading: purchaseBuy.loading,
    error: purchaseBuy.error,
  };
};
