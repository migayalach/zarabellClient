import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDashboardResponse,
  IErrorDashboard,
  INearExpirationData,
  ISalesTodayData,
  ISalesYesterdayData,
  ISellersData,
} from "../types";
import { getInfoDashboard } from "../services/dashboard.services";

interface IDashboardState {
  success: boolean;
  loading: boolean;
  error: string | null;
  bestSellers: ISellersData[];
  lessSellers: ISellersData[];
  nearExpiration: INearExpirationData[];
  todaySales: ISalesTodayData | null;
  yesterdaySales: ISalesYesterdayData | null;
  totalProducts: number;
  totalOutputsCurrentMonth: number;
  totalLotsToExpiration: number;
}

const initialState: IDashboardState = {
  success: false,
  loading: false,
  error: null,
  bestSellers: [],
  lessSellers: [],
  nearExpiration: [],
  todaySales: null,
  yesterdaySales: null,
  totalProducts: 0,
  totalOutputsCurrentMonth: 0,
  totalLotsToExpiration: 0,
};

export const getDashboardInfo = createAsyncThunk<
  IDashboardResponse,
  void,
  { rejectValue: IErrorDashboard }
>("dashboard/getInfoDashboard", async (_, { rejectWithValue }) => {
  try {
    return await getInfoDashboard();
  } catch (error) {
    return rejectWithValue(error as IErrorDashboard);
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    resetInfoDashboard: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
      state.bestSellers = [];
      state.lessSellers = [];
      state.nearExpiration = [];
      state.todaySales = null;
      state.yesterdaySales = null;
      state.totalProducts = 0;
      state.totalOutputsCurrentMonth = 0;
      state.totalLotsToExpiration = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getDashboardInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = action.payload.results.bestSellers;
        state.lessSellers = action.payload.results.lessSellers;
        state.nearExpiration = action.payload.results.nearExpiration;
        state.todaySales = action.payload.results.todaySales;
        state.yesterdaySales = action.payload.results.yesterdaySales;
        state.totalProducts = action.payload.results.totalProducts;
        state.totalOutputsCurrentMonth =
          action.payload.results.totalOutputsCurrentMonth;
        state.totalLotsToExpiration =
          action.payload.results.totalLotsToExpiration;
      })
      .addCase(getDashboardInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default dashboardSlice.reducer;

export const { clearDashboardError, resetInfoDashboard } =
  dashboardSlice.actions;
