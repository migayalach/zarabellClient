import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewOutputHistory,
  deleteOneOutputHistory,
  getAllOutputHistories,
  getOneOutputHistoryByID,
  updateOneOutputHistory,
  getListOutputDetail,
} from "../service/outputHistory.services";
import {
  IErrorOutputHistory,
  IListProductsData,
  IOutputHistory,
  IOutputHistoryCreate,
  IOutputHistoryUpdate,
  IPaginationOutputHistory,
  IResponseListProducts,
  IResponseOutputHistories,
  IResponseOutputHistory,
  TActionOuputHistory,
} from "../types";

interface IOutputHistoryState {
  info: IPaginationOutputHistory | null;
  results: IOutputHistory[];
  currentOutputHistory: IOutputHistory | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  action: TActionOuputHistory | null;
  listProducts: IListProductsData | null;
}

const initialState: IOutputHistoryState = {
  info: null,
  results: [],
  currentOutputHistory: null,
  loading: false,
  error: null,
  success: false,
  action: null,
  listProducts: null,
};

export const getAllListOutputHistory = createAsyncThunk<
  IResponseOutputHistories,
  { idOutput: number; page: number | undefined },
  { rejectValue: IErrorOutputHistory }
>(
  "outputHistory/getAllOutputHistory",
  async ({ idOutput, page }, { rejectWithValue }) => {
    try {
      return await getAllOutputHistories(idOutput, page);
    } catch (error) {
      return rejectWithValue(error as IErrorOutputHistory);
    }
  },
);

export const getOutputHistoryByID = createAsyncThunk<
  IResponseOutputHistory,
  { idOutput: number; idInputRecord: number },
  { rejectValue: IErrorOutputHistory }
>(
  "outputHistory/getOutputHistoryByID",
  async ({ idOutput, idInputRecord }, { rejectWithValue }) => {
    try {
      return await getOneOutputHistoryByID(idOutput, idInputRecord);
    } catch (error) {
      return rejectWithValue(error as IErrorOutputHistory);
    }
  },
);

export const createOutputHistory = createAsyncThunk<
  IResponseOutputHistory,
  IOutputHistoryCreate,
  { rejectValue: IErrorOutputHistory }
>("outputHistory/createOutputHistory", async (data, { rejectWithValue }) => {
  try {
    return await createNewOutputHistory(data);
  } catch (error) {
    return rejectWithValue(error as IErrorOutputHistory);
  }
});

export const updateOneOutputHistoryByID = createAsyncThunk<
  IResponseOutputHistory,
  IOutputHistoryUpdate,
  { rejectValue: IErrorOutputHistory }
>("outputHistory/updateOutputHistory", async (data, { rejectWithValue }) => {
  try {
    return await updateOneOutputHistory(data);
  } catch (error) {
    return rejectWithValue(error as IErrorOutputHistory);
  }
});

export const deleteOneOutputHistoryByID = createAsyncThunk<
  IResponseOutputHistory,
  { idOutput: number; idInputRecord: number },
  { rejectValue: IErrorOutputHistory }
>(
  "outputHistory/deleteOutputHistory",
  async ({ idOutput, idInputRecord }, { rejectWithValue }) => {
    try {
      return await deleteOneOutputHistory(idOutput, idInputRecord);
    } catch (error) {
      return rejectWithValue(error as IErrorOutputHistory);
    }
  },
);

export const getListProductsInfo = createAsyncThunk<
  IResponseListProducts,
  number,
  { rejectValue: IErrorOutputHistory }
>(
  "outputHistory/listProductsDetails",
  async (idOutput, { rejectWithValue }) => {
    try {
      return await getListOutputDetail(idOutput);
    } catch (error) {
      return rejectWithValue(error as IErrorOutputHistory);
    }
  },
);

const outputHistorySlice = createSlice({
  name: "output-history",
  initialState,
  reducers: {
    clearInfoOutputHistoryError: (state) => {
      state.error = null;
    },
    clearCurrentOutputHistoryData: (state) => {
      state.currentOutputHistory = null;
    },
    resetAllDataOutputHistory: (state) => {
      state.info = null;
      state.results = [];
      state.currentOutputHistory = null;
      state.loading = false;
      state.error = null;
    },
    resetCreateUpdateOHData: (state) => {
      state.success = false;
      state.currentOutputHistory = null;
      state.action = null;
    },
    resetListProductsOutputs: (state) => {
      state.success = false;
      state.listProducts = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListOutputHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListOutputHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListOutputHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET ALL LIST OUTPUTS PRODUCTS
      .addCase(getListProductsInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListProductsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.listProducts = action.payload.value;
      })
      .addCase(getListProductsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getOutputHistoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutputHistoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOutputHistory = action.payload.value;
      })
      .addCase(getOutputHistoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createOutputHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOutputHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentOutputHistory = action.payload.value;
        state.action = "create";
      })
      .addCase(createOutputHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneOutputHistoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneOutputHistoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentOutputHistory = action.payload.value;
        state.action = "update";
      })
      .addCase(updateOneOutputHistoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneOutputHistoryByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneOutputHistoryByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentOutputHistory = action.payload.value;
        state.action = "delete";
      })
      .addCase(deleteOneOutputHistoryByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default outputHistorySlice.reducer;

export const {
  clearInfoOutputHistoryError,
  clearCurrentOutputHistoryData,
  resetAllDataOutputHistory,
  resetCreateUpdateOHData,
  resetListProductsOutputs,
} = outputHistorySlice.actions;
