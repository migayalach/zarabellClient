import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewOutput,
  deleteOneOutput,
  getAllOutputs,
  getOneOutputByID,
  updateOneOutput,
} from "../services/outputsInventory.services";

import {
  IErrorOutput,
  IOutput,
  IOutputCreate,
  IOutputUpdate,
  IPaginationOutput,
  IResponseOutput,
  IResponseOutputs,
} from "../types";

type TResponseOutput = "create" | "delete" | "update";

interface IOutputState {
  info: IPaginationOutput | null;
  results: IOutput[];
  currentOutput: IOutput | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: IOutputState = {
  info: null,
  results: [],
  currentOutput: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllOutput = createAsyncThunk<
  IResponseOutputs,
  { page: number | undefined },
  { rejectValue: IErrorOutput }
>("output/getAllOutputs", async ({ page }, { rejectWithValue }) => {
  try {
    return await getAllOutputs(page);
  } catch (error) {
    return rejectWithValue(error as IErrorOutput);
  }
});

export const getOutputByID = createAsyncThunk<
  IResponseOutput,
  number,
  { rejectValue: IErrorOutput }
>("output/getOutputByID", async ( idProduct , { rejectWithValue }) => {
  try {
    return await getOneOutputByID(idProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorOutput);
  }
});

export const createOutput = createAsyncThunk<
  IResponseOutput,
  IOutputCreate,
  { rejectValue: IErrorOutput }
>("output/createOutput", async (data, { rejectWithValue }) => {
  try {
    return await createNewOutput(data);
  } catch (error) {
    return rejectWithValue(error as IErrorOutput);
  }
});

export const updateOneOutputByID = createAsyncThunk<
  IResponseOutput,
  IOutputUpdate,
  { rejectValue: IErrorOutput }
>("output/updateOutput", async (data, { rejectWithValue }) => {
  try {
    return await updateOneOutput(data);
  } catch (error) {
    return rejectWithValue(error as IErrorOutput);
  }
});

export const deleteOneOutputByID = createAsyncThunk<
  IResponseOutput,
  number,
  { rejectValue: IErrorOutput }
>("output/deleteOutput", async (idProduct, { rejectWithValue }) => {
  try {
    return await deleteOneOutput(idProduct);
  } catch (error) {
    return rejectWithValue(error as IErrorOutput);
  }
});

const outputSlice = createSlice({
  name: "output",
  initialState,
  reducers: {
    clearInfoOutputError: (state) => {
      state.error = null;
    },
    clearCurrentOutputData: (state) => {
      state.currentOutput = null;
    },
    resetAllDataOutput: (state) => {
      state.info = null;
      state.results = [];
      state.currentOutput = null;
      state.loading = false;
      state.error = null;
    },
    resetOutputCreateUpdateData: (state) => {
      state.success = false;
      state.currentOutput = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllOutput.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOutput.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllOutput.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOutput = action.payload.value;
      })
      .addCase(getOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createOutput.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOutput.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentOutput = action.payload.value;
      })
      .addCase(createOutput.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(updateOneOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentOutput = action.payload.value;
      })
      .addCase(deleteOneOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default outputSlice.reducer;

export const {
  clearInfoOutputError,
  clearCurrentOutputData,
  resetAllDataOutput,
  resetOutputCreateUpdateData,
} = outputSlice.actions;
