import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPriceHistory,
  getAllPriceHistories,
  updateOnePriceHistory,
} from "../services/priceHistory.services";
import {
  IErrorPriceHistory,
  IPaginationPriceHistory,
  IPriceHistory,
  IPriceHistoryCreate,
  IPriceHistoryUpdate,
  IResponsePriceHistories,
  IResponsePriceHistory,
} from "../types";

interface IPriceHistoryState {
  info: IPaginationPriceHistory | null;
  results: IPriceHistory[];
  currentPriceHistory: IPriceHistory | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: IPriceHistoryState = {
  info: null,
  results: [],
  currentPriceHistory: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllPriceHistoryByID = createAsyncThunk<
  IResponsePriceHistories,
  { idProduct: number; page: number | undefined },
  { rejectValue: IErrorPriceHistory }
>(
  "price-history/getAllPriceHistories",
  async ({ idProduct, page }, { rejectWithValue }) => {
    try {
      return await getAllPriceHistories(idProduct, page);
    } catch (error) {
      return rejectWithValue(error as IErrorPriceHistory);
    }
  },
);

export const createPriceHistory = createAsyncThunk<
  IResponsePriceHistory,
  IPriceHistoryCreate,
  { rejectValue: IErrorPriceHistory }
>("price-history/createPriceHistory", async (data, { rejectWithValue }) => {
  try {
    return await createNewPriceHistory(data);
  } catch (error) {
    return rejectWithValue(error as IErrorPriceHistory);
  }
});

export const updateOnePriceHistoryByID = createAsyncThunk<
  IResponsePriceHistory,
  IPriceHistoryUpdate,
  { rejectValue: IErrorPriceHistory }
>("price-history/updatePriceHistory", async (data, { rejectWithValue }) => {
  try {
    return await updateOnePriceHistory(data);
  } catch (error) {
    return rejectWithValue(error as IErrorPriceHistory);
  }
});

const priceHistorySlice = createSlice({
  name: "price-history",
  initialState,
  reducers: {
    clearInfoPriceHistoryError: (state) => {
      state.error = null;
    },
    clearCurrentPriceHistoryData: (state) => {
      state.currentPriceHistory = null;
    },
    resetAllDataPriceHistory: (state) => {
      state.info = null;
      state.results = [];
      state.currentPriceHistory = null;
      state.loading = false;
      state.error = null;
    },
    resetCreateUpdateData: (state) => {
      state.success = false;
      state.currentPriceHistory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllPriceHistoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPriceHistoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllPriceHistoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createPriceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPriceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentPriceHistory = action.payload.value;
        // state.results.unshift(action.payload.value);
      })
      .addCase(createPriceHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOnePriceHistoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOnePriceHistoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        // state.currentPriceHistory = action.payload.value;
        // const updated = action.payload.value;
        // state.results = state.results.map((item) =>
        //   item.idPriceHistory === updated.idPriceHistory ? updated : item,
        // );
      })
      .addCase(updateOnePriceHistoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default priceHistorySlice.reducer;

export const {
  clearInfoPriceHistoryError,
  clearCurrentPriceHistoryData,
  resetAllDataPriceHistory,
  resetCreateUpdateData,
} = priceHistorySlice.actions;
