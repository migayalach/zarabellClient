import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/shared/api/axios";
import { ApiError } from "@/shared/api/api.interface";
import {
  PurchaseMonthBuysResults,
  PurchaseMonthBuys,
  MonthBuyData,
} from "../types";

export interface MonthBuyState {
  results: PurchaseMonthBuysResults["results"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: MonthBuyState = {
  results: null,
  loading: false,
  error: null,
};

export const getMonthPurchaseBuys = createAsyncThunk<
  PurchaseMonthBuys,
  MonthBuyData,
  { rejectValue: ApiError }
>("monthPurchaseBuys", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/purchase-month/buys", {
      filtroventas: data.filtroventas,
      year: data.year,
      month: data.month,
      pagina: data.pagina,
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: 500,
      message: "Error fetching purchase month buys",
    });
  }
});

const monthPurchaseBuySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    clearInfoMonthPurchaseBuy: (state) => {
      state.results = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMonthPurchaseBuys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthPurchaseBuys.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
      })
      .addCase(getMonthPurchaseBuys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default monthPurchaseBuySlice.reducer;
export const { clearInfoMonthPurchaseBuy } = monthPurchaseBuySlice.actions;
