import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getAllUsers,
  getOneUserByID,
} from "../services/users.services";
import {
  IErrorUser,
  IPaginationUser,
  IResponseUsers,
  IResponseUser,
  IUserInfo,
  IUserUpdate,
  TUserActionWatch,
} from "../types";

interface IUserState {
  info: IPaginationUser | null;
  results: IUserInfo[];
  currentUser: IUserInfo | null;
  loading: boolean;
  error: string | null;
  actionWatch: TUserActionWatch | null;
}

const initialState: IUserState = {
  info: null,
  results: [],
  currentUser: null,
  loading: false,
  error: null,
  actionWatch: null,
};

export const getAllListUsers = createAsyncThunk<
  IResponseUsers,
  number | undefined,
  { rejectValue: IErrorUser }
>("users/getAllUsers", async (page, { rejectWithValue }) => {
  try {
    return await getAllUsers(page);
  } catch (error) {
    return rejectWithValue(error as IErrorUser);
  }
});

export const getUserByID = createAsyncThunk<
  IResponseUser,
  number,
  { rejectValue: IErrorUser }
>("users/getUserByID", async (idUser, { rejectWithValue }) => {
  try {
    return await getOneUserByID(idUser);
  } catch (error) {
    return rejectWithValue(error as IErrorUser);
  }
});

export const createUser = createAsyncThunk<
  IResponseUser,
  Omit<IUserInfo, "idUser" | "stateUser" | "nameRole">,
  { rejectValue: IErrorUser }
>("users/createUser", async (dataUser, { rejectWithValue }) => {
  try {
    return await createNewUser(dataUser);
  } catch (error) {
    return rejectWithValue(error as IErrorUser);
  }
});

export const updateOneUserByID = createAsyncThunk<
  IResponseUser,
  IUserUpdate,
  { rejectValue: IErrorUser }
>("users/updateUser", async (dataUser, { rejectWithValue }) => {
  try {
    return await updateOneUser(dataUser);
  } catch (error) {
    return rejectWithValue(error as IErrorUser);
  }
});

export const deleteOneUserByID = createAsyncThunk<
  IResponseUser,
  number,
  { rejectValue: IErrorUser }
>("users/deleteUser", async (idUser, { rejectWithValue }) => {
  try {
    return await deleteOneUser(idUser);
  } catch (error) {
    return rejectWithValue(error as IErrorUser);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addInfoWatch: (state, action) => {
      state.actionWatch = action.payload;
    },
    clearInfoWatch: (state) => {
      state.actionWatch = null;
    },
    clearInfoUserError: (state) => {
      state.error = null;
    },
    clearCurrentUserData: (state) => {
      state.currentUser = null;
    },
    resetAllDataUser: (state) => {
      state.info = null;
      state.results = [];
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // TODO GET ALL
      .addCase(getAllListUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllListUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload.info;
        state.results = action.payload.results;
      })
      .addCase(getAllListUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO GET BY ID
      .addCase(getUserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.value;
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO CREATE
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.results.unshift(action.payload.value);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO UPDATE
      .addCase(updateOneUserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOneUserByID.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.value;
        state.results = state.results.map((item) =>
          item.idUser === updated.idUser ? updated : item,
        );
      })
      .addCase(updateOneUserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      })

      // TODO DELETE
      .addCase(deleteOneUserByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOneUserByID.fulfilled, (state, action) => {
        state.loading = false;
        // const idUser = action.payload.value.idUser;
        // state.results = state.results.filter((item) => item.idUser !== idUser);
      })
      .addCase(deleteOneUserByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? "Error";
      });
  },
});

export default userSlice.reducer;

export const {
  clearInfoUserError,
  clearCurrentUserData,
  resetAllDataUser,
  addInfoWatch,
  clearInfoWatch,
} = userSlice.actions;
