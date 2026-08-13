import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewPriceHistory,
  getAllPriceHistories,
  updateOnePriceHistory,
  getAllMagazine,
  getAllMagazineData,
} from "../services/priceHistory.services";
import {
  IErrorPriceHistory,
  IPaginationPriceHistory,
  IPriceHistory,
  IPriceHistoryCreate,
  IPriceHistoryUpdate,
  IResponsePriceHistories,
  IResponsePriceHistory,
  IResponseMagazine,
  IMagazine,
} from "../types";

interface IPriceHistoryState {
  info: IPaginationPriceHistory | null;
  infoMagazinePDF: IPaginationPriceHistory | null;
  results: IPriceHistory[];
  resultsMagazine: IMagazine[];
  resultAllMagazinePDF: IMagazine[];
  currentPriceHistory: IPriceHistory | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: IPriceHistoryState = {
  info: null,
  infoMagazinePDF: null,
  resultAllMagazinePDF: [],
  results: [],
  resultsMagazine: [],
  currentPriceHistory: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllPriceHistoryByID = createAsyncThunk<
  IResponsePriceHistories,
  { idInputRecord: number; page: number | undefined },
  { rejectValue: IErrorPriceHistory }
>(
  "price-history/getAllPriceHistories",
  async ({ idInputRecord, page }, { rejectWithValue }) => {
    try {
      return await getAllPriceHistories(idInputRecord, page);
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

export const getMagazineProducts = createAsyncThunk<
  IResponseMagazine,
  { page: number | undefined },
  { rejectValue: IErrorPriceHistory }
>("price-history/magazine", async ({ page }, { rejectWithValue }) => {
  try {
    return await getAllMagazine(page);
  } catch (error) {
    return rejectWithValue(error as IErrorPriceHistory);
  }
});

export const getMagazineAllProducts = createAsyncThunk<
  IResponseMagazine,
  void,
  { rejectValue: IErrorPriceHistory }
>("price-history/magazine-pdf", async (_, { rejectWithValue }) => {
  try {
    return await getAllMagazineData();
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
    resetMagazineData: (state) => {
      state.info = null;
      state.resultsMagazine = [];
      state.loading = false;
      state.error = null;
    },
    resetMagazinePDF: (state) => {
      state.infoMagazinePDF = null;
      state.resultAllMagazinePDF = [];
      state.loading = false;
      state.error = null;
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

      // TODO GET ALL MAGAZINE
      .addCase(getMagazineProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMagazineProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.resultsMagazine = action.payload.results;
      })
      .addCase(getMagazineProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET ALL MAGAZINE PDF
      .addCase(getMagazineAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMagazineAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.infoMagazinePDF = action.payload.info;
        state.resultAllMagazinePDF = action.payload.results;
      })
      .addCase(getMagazineAllProducts.rejected, (state, action) => {
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
  resetMagazineData,
  resetMagazinePDF
} = priceHistorySlice.actions;
