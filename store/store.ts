import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "@/features/auth/store/auth.slice";
// import { monthPurchaseBuyReducer } from "@/features/month-purchase/store/buys";
// import { monthPurchaseSearchReducer } from "@/features/month-purchase/store/search";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    // monthPurchaseBuy: monthPurchaseBuyReducer,
    // monthPurchaseSearch: monthPurchaseSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
