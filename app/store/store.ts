import { configureStore } from "@reduxjs/toolkit";
import auth from "@/app/features/auth/store/auth.slice";
import roles from "@/app/features/roles/store/role.slice";
import users from "@/app/features/users/store/user.slice";
import categories from "@/app/features/categories/store/category.slice";
import products from "@/app/features/products/store/product.slice";
import providers from "@/app/features/providers/store/provider.slice";
import reasons from "@/app/features/reasons/store/reason.slice";
import typeOutputs from "@/app/features/typeOutputs/store/typeOutput.slice";
import inputRecords from "@/app/features/inputRecord/store/entriesInventory.slice";
import priceHistory from "@/app/features/priceHistory/store/priceHistory.slice";
import outputs from "@/app/features/outputsInventory/store/outputsInventory.slice";
import outputHistory from "@/app/features/outputHistory/store/outputHistory.slice";
import branchs from "@/app/features/branchs/store/branch.slice";
import dashboard from "@/app/features/dashboard/store/dashboard.slice";

export const store = configureStore({
  reducer: {
    auth,
    roles,
    users,
    categories,
    products,
    providers,
    reasons,
    typeOutputs,
    inputRecords,
    priceHistory,
    outputs,
    outputHistory,
    branchs,
    dashboard,
  },
  // devTools: process.env.AROUND_DEVELOP === "develop",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
