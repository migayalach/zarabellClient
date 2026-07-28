import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllInputRecords,
  getOneInputRecordByID,
  createNewInputRecord,
  updateOneInputRecord,
  deleteOneInputRecord,
} from "../services/entriesInventory.services";
import {
  IRecordInput,
  IRecordICreate,
  IRecordIUpdate,
  IPaginationRecordInput,
  IErrorRecordInput,
  IResponseRecordInputs,
  IResponseRecordnput,
} from "../types";

type TInputRecord = "create" | "delete" | "update";

interface IRecordInputState {
  info: IPaginationRecordInput | null;
  results: IRecordInput[];
  currentInputRecord: IRecordInput | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  action: TInputRecord | null;
}

const initialState: IRecordInputState = {
  info: null,
  results: [],
  currentInputRecord: null,
  loading: false,
  error: null,
  success: false,
  action: null,
};

export const getAllListInputRecord = createAsyncThunk<
  IResponseRecordInputs,
  number | undefined,
  { rejectValue: IErrorRecordInput }
>("inputRecord/getAllInputRecord", async (page, { rejectWithValue }) => {
  try {
    return await getAllInputRecords(page);
  } catch (error) {
    return rejectWithValue(error as IErrorRecordInput);
  }
});

export const getInputRecordByID = createAsyncThunk<
  IResponseRecordnput,
  number,
  { rejectValue: IErrorRecordInput }
>(
  "inputRecord/getInputRecordByID",
  async (idInputRecord, { rejectWithValue }) => {
    try {
      return await getOneInputRecordByID(idInputRecord);
    } catch (error) {
      return rejectWithValue(error as IErrorRecordInput);
    }
  },
);

export const createInputRecord = createAsyncThunk<
  IResponseRecordnput,
  IRecordICreate,
  { rejectValue: IErrorRecordInput }
>("inputRecord/createInputRecord", async (data, { rejectWithValue }) => {
  try {
    return await createNewInputRecord(data);
  } catch (error) {
    return rejectWithValue(error as IErrorRecordInput);
  }
});

export const updateOneInputRecordByID = createAsyncThunk<
  IResponseRecordnput,
  IRecordIUpdate,
  { rejectValue: IErrorRecordInput }
>("inputRecord/updateInputRecord", async (data, { rejectWithValue }) => {
  try {
    return await updateOneInputRecord(data);
  } catch (error) {
    return rejectWithValue(error as IErrorRecordInput);
  }
});

export const deleteOneInputRecordByID = createAsyncThunk<
  IResponseRecordnput,
  number,
  { rejectValue: IErrorRecordInput }
>(
  "inputRecord/deleteInputRecord",
  async (idInputRecord, { rejectWithValue }) => {
    try {
      return await deleteOneInputRecord(idInputRecord);
    } catch (error) {
      return rejectWithValue(error as IErrorRecordInput);
    }
  },
);

const inputRecordSlice = createSlice({
  name: "input-record",
  initialState,
  reducers: {
    clearInfoInputRecordError: (state) => {
      state.error = null;
    },
    clearCurrentInputRecordData: (state) => {
      state.currentInputRecord = null;
    },
    resetAllDataInputRecord: (state) => {
      state.info = null;
      state.results = [];
      state.currentInputRecord = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetInputRecordCreateUpdateData: (state) => {
      state.success = false;
      state.currentInputRecord = null;
    },
    resetStateActionInputRecord: (state) => {
      state.action = null;
      state.currentInputRecord = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListInputRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListInputRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListInputRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getInputRecordByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInputRecordByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInputRecord = action.payload.value;
      })
      .addCase(getInputRecordByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createInputRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInputRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentInputRecord = action.payload.value;
        state.action = "create";
      })
      .addCase(createInputRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneInputRecordByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneInputRecordByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentInputRecord = action.payload.value;
        state.action = "update";
      })
      .addCase(updateOneInputRecordByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneInputRecordByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneInputRecordByID.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.currentInputRecord = action.payload.value;
        state.action = "delete";
      })
      .addCase(deleteOneInputRecordByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default inputRecordSlice.reducer;

export const {
  clearInfoInputRecordError,
  clearCurrentInputRecordData,
  resetAllDataInputRecord,
  resetInputRecordCreateUpdateData,
  resetStateActionInputRecord,
} = inputRecordSlice.actions;
