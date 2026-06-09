import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/app/shared/api/axios";
import { ApiError } from "@/app/shared/api/api.interface";
import { InfoData, PaginateResponse, RoleInfo } from "../types";

export interface RoleState {
  results: PaginateResponse["results"] | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  results: null,
  loading: false,
  error: null,
};

export const getRole = createAsyncThunk<
  RoleInfo,
  RoleInfo,
  { rejectValue: ApiError }
>("role", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post("/purchase-month/buys", {
      page
    });
    return response.data;
  } catch (error) {
    return rejectWithValue({
      status: 500,
      message: "Error fetching purchase month buys",
    });
  }
});

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearInfoRol: (state) => {
      state.results = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });
  },
});

export default roleSlice.reducer;
export const { clearInfoRol } = roleSlice.actions;
