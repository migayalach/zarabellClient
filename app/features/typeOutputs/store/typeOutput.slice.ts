import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewTypeOutput,
  deleteOneTypeOutput,
  getAllTypeOutputs,
  getOneTypeOutputByID,
  updateOneTypeOutput,
} from "../services/typeOutputs.services";
import {
  ITypeOutput,
  ITypeOutputCreate,
  ITypeOutputUpdate,
  IPaginationTypeOutput,
  IErrorTypeOutput,
  IResponseTypeOutputs,
  IResponseTypeOutput,
} from "../types";

interface ITOutputState {
  info: IPaginationTypeOutput | null;
  results: ITypeOutput[];
  currentTOutput: ITypeOutput | null;
  loading: boolean;
  error: string | null;
}

const initialState: ITOutputState = {
  info: null,
  results: [],
  currentTOutput: null,
  loading: false,
  error: null,
};

export const getAllListTOutput = createAsyncThunk<
  IResponseTypeOutputs,
  number | undefined,
  { rejectValue: IErrorTypeOutput }
>("typeOutputs/getAllTOutput", async (page, { rejectWithValue }) => {
  try {
    return await getAllTypeOutputs(page);
  } catch (error) {
    return rejectWithValue(error as IErrorTypeOutput);
  }
});

export const getTOutputByID = createAsyncThunk<
  IResponseTypeOutput,
  number,
  { rejectValue: IErrorTypeOutput }
>("typeOutputs/getTOutputByID", async (idTypeOutput, { rejectWithValue }) => {
  try {
    return await getOneTypeOutputByID(idTypeOutput);
  } catch (error) {
    return rejectWithValue(error as IErrorTypeOutput);
  }
});

export const createTOutput = createAsyncThunk<
  IResponseTypeOutput,
  ITypeOutputCreate,
  { rejectValue: IErrorTypeOutput }
>("typeOutputs/createTOutput", async (infoTypeOutput, { rejectWithValue }) => {
  try {
    return await createNewTypeOutput(infoTypeOutput);
  } catch (error) {
    return rejectWithValue(error as IErrorTypeOutput);
  }
});

export const updateOneTOutputByID = createAsyncThunk<
  IResponseTypeOutput,
  ITypeOutputUpdate,
  { rejectValue: IErrorTypeOutput }
>("typeOutputs/updateTOutput", async (infoTypeOutput, { rejectWithValue }) => {
  try {
    return await updateOneTypeOutput(infoTypeOutput);
  } catch (error) {
    return rejectWithValue(error as IErrorTypeOutput);
  }
});

export const deleteOneTOutputByID = createAsyncThunk<
  IResponseTypeOutput,
  number,
  { rejectValue: IErrorTypeOutput }
>("typeOutputs/deleteTOutput", async (idTypeOutput, { rejectWithValue }) => {
  try {
    return await deleteOneTypeOutput(idTypeOutput);
  } catch (error) {
    return rejectWithValue(error as IErrorTypeOutput);
  }
});

const typeOutputSlice = createSlice({
  name: "typeOutput",
  initialState,
  reducers: {
    clearInfoTOutputError: (state) => {
      state.error = null;
    },
    clearCurrentTOutputData: (state) => {
      state.currentTOutput = null;
    },
    resetAllDataTOutput: (state) => {
      state.info = null;
      state.results = [];
      state.currentTOutput = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListTOutput.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListTOutput.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListTOutput.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getTOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTOutput = action.payload.value;
      })
      .addCase(getTOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createTOutput.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTOutput.fulfilled, (state, action) => {
        state.loading = false;
        state.results.unshift(action.payload.value);
      })
      .addCase(createTOutput.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneTOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneTOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idTypeOutput === updated.idTypeOutput ? updated : item,
        );
      })
      .addCase(updateOneTOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneTOutputByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneTOutputByID.fulfilled, (state, action) => {
        state.loading = false;
        const idTypeOutput = action.payload.value.idTypeOutput;
        state.results = state.results.filter((item) => item.idTypeOutput !== idTypeOutput);
      })
      .addCase(deleteOneTOutputByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default typeOutputSlice.reducer;

export const {
  clearInfoTOutputError,
  clearCurrentTOutputData,
  resetAllDataTOutput,
} = typeOutputSlice.actions;
