import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/store/auth.slice";
import rolesReducer from "@/app/features/roles/store/role.slice";
import usersReducer from "@/app/features/users/store/user.slice";
import categories from "@/app/features/categories/store/category.slice";
import products from "@/app/features/products/store/product.slice";
import providers from "@/app/features/providers/store/provider.slice";
import reasons from "@/app/features/reasons/store/reason.slice";
import typeOutputs from "@/app/features/typeOutputs/store/typeOutput.slice";
import inputRecords from "@/app/features/entriesInventory/store/entriesInventory.slice";
import priceHistory from "@/app/features/priceHistory/store/priceHistory.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
    categories: categories,
    products: products,
    providers: providers,
    reasons: reasons,
    typeOutputs: typeOutputs,
    inputRecords: inputRecords,
    priceHistory: priceHistory,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
