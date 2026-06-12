import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/app/features/auth/store/auth.slice";
import rolesReducer from "@/app/features/roles/store/role.slice";
import usersReducer from "@/app/features/users/store/user.slice";
import categories from "@/app/features/categories/store/category.slice";
import products from "@/app/features/products/store/product.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roles: rolesReducer,
    users: usersReducer,
    categories: categories,
    products: products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
