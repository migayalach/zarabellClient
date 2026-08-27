import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createNewBranch,
  deleteOneRole,
  getAllBranchs,
  getOneBranchByID,
  updateOneRole,
  filterBranchs,
} from "../services/branchs.services";

import {
  IErrorBranch,
  IPaginationBranch,
  IResponseBranch,
  IResponseBranchs,
  IBranchs,
  IBranchCreate,
  IBranchUpdate,
  IFilterBranch,
} from "../types";

type TBranch = "create" | "delete" | "update" | "filters";

interface IBranchState {
  info: IPaginationBranch | null;
  results: IBranchs[];
  currentBranch: IBranchs | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  action: TBranch | null;
}

const initialState: IBranchState = {
  info: null,
  results: [],
  currentBranch: null,
  loading: false,
  error: null,
  success: false,
  action: null,
};

export const getAllListBranchs = createAsyncThunk<
  IResponseBranchs,
  number | undefined,
  { rejectValue: IErrorBranch }
>("branchs/getAllListBranchs", async (page, { rejectWithValue }) => {
  try {
    return await getAllBranchs(page);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

export const getBranchByID = createAsyncThunk<
  IResponseBranch,
  number,
  { rejectValue: IErrorBranch }
>("branchs/getBranchByID", async (idBranch, { rejectWithValue }) => {
  try {
    return await getOneBranchByID(idBranch);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

export const createBranch = createAsyncThunk<
  IResponseBranch,
  IBranchCreate,
  { rejectValue: IErrorBranch }
>("branchs/createBranch", async (data, { rejectWithValue }) => {
  try {
    return await createNewBranch(data);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

export const updateOneBranchByID = createAsyncThunk<
  IResponseBranch,
  IBranchUpdate,
  { rejectValue: IErrorBranch }
>("branchs/updateOneBranchByID", async (data, { rejectWithValue }) => {
  try {
    return await updateOneRole(data);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

export const deleteOneBranchByID = createAsyncThunk<
  IResponseBranch,
  number,
  { rejectValue: IErrorBranch }
>("branchs/deleteOneBranchByID", async (idBranch, { rejectWithValue }) => {
  try {
    return await deleteOneRole(idBranch);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

export const branchFilters = createAsyncThunk<
  IResponseBranchs,
  {
    filters?: IFilterBranch;
    page?: number | undefined;
  },
  { rejectValue: IErrorBranch }
>("branchs/filter", async ({ filters, page }, { rejectWithValue }) => {
  try {
    return await filterBranchs(filters, page);
  } catch (error) {
    return rejectWithValue(error as IErrorBranch);
  }
});

const branchSlice = createSlice({
  name: "branchs",
  initialState,
  reducers: {
    clearInfoBranchError: (state) => {
      state.error = null;
    },
    clearCurrentBranchData: (state) => {
      state.currentBranch = null;
    },
    resetAllDataBranch: (state) => {
      state.info = null;
      state.results = [];
      state.currentBranch = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetBranchCreateUpdateData: (state) => {
      state.success = false;
      state.currentBranch = null;
    },
    resetStateActionBranch: (state) => {
      state.action = null;
      state.currentBranch = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListBranchs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListBranchs.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListBranchs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getBranchByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBranchByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBranch = action.payload.value;
      })
      .addCase(getBranchByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentBranch = action.payload.value;
        state.action = "create";
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneBranchByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneBranchByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentBranch = action.payload.value;
        state.action = "update";
      })
      .addCase(updateOneBranchByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneBranchByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneBranchByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentBranch = action.payload.value;
        state.action = "delete";
      })
      .addCase(deleteOneBranchByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO FILTERS
      .addCase(branchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(branchFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
        state.action = "filters";
      })
      .addCase(branchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default branchSlice.reducer;

export const {
  clearInfoBranchError,
  clearCurrentBranchData,
  resetAllDataBranch,
  resetBranchCreateUpdateData,
  resetStateActionBranch,
} = branchSlice.actions;
