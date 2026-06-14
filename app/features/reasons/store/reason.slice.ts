import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewReason,
  deleteOneReason,
  getAllReasons,
  getOneReasonByID,
  updateOneReason,
} from "../services/reasons.services";
import {
  IReason,
  IReasonCreate,
  IReasonUpdate,
  IPaginationReason,
  IErrorReason,
  IResponseReasons,
  IResponseReason,
} from "../types";

interface IReasonState {
  info: IPaginationReason | null;
  results: IReason[];
  currentReason: IReason | null;
  loading: boolean;
  error: string | null;
}

const initialState: IReasonState = {
  info: null,
  results: [],
  currentReason: null,
  loading: false,
  error: null,
};

export const getAllListReason = createAsyncThunk<
  IResponseReasons,
  number | undefined,
  { rejectValue: IErrorReason }
>("reasons/getAllReasons", async (page, { rejectWithValue }) => {
  try {
    return await getAllReasons(page);
  } catch (error) {
    return rejectWithValue(error as IErrorReason);
  }
});

export const getReasonByID = createAsyncThunk<
  IResponseReason,
  number,
  { rejectValue: IErrorReason }
>("reasons/getReasonByID", async (idReason, { rejectWithValue }) => {
  try {
    return await getOneReasonByID(idReason);
  } catch (error) {
    return rejectWithValue(error as IErrorReason);
  }
});

export const createReason = createAsyncThunk<
  IResponseReason,
  IReasonCreate,
  { rejectValue: IErrorReason }
>("reasons/createReason", async (infoReason, { rejectWithValue }) => {
  try {
    return await createNewReason(infoReason);
  } catch (error) {
    return rejectWithValue(error as IErrorReason);
  }
});

export const updateOneReasonByID = createAsyncThunk<
  IResponseReason,
  IReasonUpdate,
  { rejectValue: IErrorReason }
>("reasons/updateReason", async (infoReason, { rejectWithValue }) => {
  try {
    return await updateOneReason(infoReason);
  } catch (error) {
    return rejectWithValue(error as IErrorReason);
  }
});

export const deleteOneReasonByID = createAsyncThunk<
  IResponseReason,
  number,
  { rejectValue: IErrorReason }
>("reasons/deleteReason", async (idReason, { rejectWithValue }) => {
  try {
    return await deleteOneReason(idReason);
  } catch (error) {
    return rejectWithValue(error as IErrorReason);
  }
});

const reasonSlice = createSlice({
  name: "reason",
  initialState,
  reducers: {
    clearInfoReasonError: (state) => {
      state.error = null;
    },
    clearCurrentReasonData: (state) => {
      state.currentReason = null;
    },
    resetAllDataReason: (state) => {
      state.info = null;
      state.results = [];
      state.currentReason = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListReason.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getReasonByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReasonByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReason = action.payload.value;
      })
      .addCase(getReasonByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReason.fulfilled, (state, action) => {
        state.loading = false;
        state.results.unshift(action.payload.value);
      })
      .addCase(createReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneReasonByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneReasonByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idReason === updated.idReason ? updated : item,
        );
      })
      .addCase(updateOneReasonByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneReasonByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneReasonByID.fulfilled, (state, action) => {
        state.loading = false;
        const idReason = action.payload.value.idReason;
        state.results = state.results.filter(
          (item) => item.idReason !== idReason,
        );
      })
      .addCase(deleteOneReasonByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default reasonSlice.reducer;

export const {
  clearInfoReasonError,
  clearCurrentReasonData,
  resetAllDataReason,
} = reasonSlice.actions;
