import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllRoles,
  getOneRoleByID,
  createNewRole,
  deleteOneRole,
  updateOneRole,
} from "../services/roles.services";
import { IErrorRole, IPaginationRole, IResponseRole, IRole } from "../types";

interface IRoleState {
  info: IPaginationRole | null;
  results: IRole[];
  currentRole: IRole | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: IRoleState = {
  info: null,
  results: [],
  currentRole: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllListRole = createAsyncThunk<
  IResponseRole,
  number | undefined,
  { rejectValue: IErrorRole }
>("roles/getAllRoles", async (page, { rejectWithValue }) => {
  try {
    return await getAllRoles(page);
  } catch (error) {
    return rejectWithValue(error as IErrorRole);
  }
});

export const getRoleByID = createAsyncThunk<
  IResponseRole,
  number,
  { rejectValue: IErrorRole }
>("roles/getRoleByID", async (idRole, { rejectWithValue }) => {
  try {
    return await getOneRoleByID(idRole);
  } catch (error) {
    return rejectWithValue(error as IErrorRole);
  }
});

export const createRole = createAsyncThunk<
  IResponseRole,
  Omit<IRole, "idRole">,
  { rejectValue: IErrorRole }
>("roles/createRole", async (dataRole, { rejectWithValue }) => {
  try {
    return await createNewRole(dataRole);
  } catch (error) {
    return rejectWithValue(error as IErrorRole);
  }
});

export const updateOneRoleByID = createAsyncThunk<
  IResponseRole,
  IRole,
  { rejectValue: IErrorRole }
>("roles/updateRole", async (dataRole, { rejectWithValue }) => {
  try {
    return await updateOneRole(dataRole);
  } catch (error) {
    return rejectWithValue(error as IErrorRole);
  }
});

export const deleteOneRoleByID = createAsyncThunk<
  IResponseRole,
  number,
  { rejectValue: IErrorRole }
>("roles/deleteRole", async (idRole, { rejectWithValue }) => {
  try {
    return await deleteOneRole(idRole);
  } catch (error) {
    return rejectWithValue(error as IErrorRole);
  }
});

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    clearInfoRoleError: (state) => {
      state.error = null;
    },
    clearCurrentRoleData: (state) => {
      state.currentRole = null;
    },
    clearSuccessFlagRole: (state) => {
      state.success = false;
    },
    resetAllDataRole: (state) => {
      state.info = null;
      state.results = [];
      state.currentRole = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListRole.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
        state.success = action.payload.success;
      })
      .addCase(getAllListRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getRoleByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRole = action.payload.value;
        state.success = action.payload.success;
      })
      .addCase(getRoleByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.results.unshift(action.payload.value);
        state.success = action.payload.success;
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneRoleByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneRoleByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idRole === updated.idRole ? updated : item,
        );
        state.success = action.payload.success;
      })
      .addCase(updateOneRoleByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneRoleByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneRoleByID.fulfilled, (state, action) => {
        state.loading = false;
        const idRole = action.payload.value.idRole;
        state.results = state.results.filter((item) => item.idRole !== idRole);
        state.success = action.payload.success;
      })
      .addCase(deleteOneRoleByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default roleSlice.reducer;

export const {
  clearInfoRoleError,
  clearCurrentRoleData,
  clearSuccessFlagRole,
  resetAllDataRole,
} = roleSlice.actions;
