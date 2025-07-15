import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, loginData, AuthPayload } from "../../models/user";
import { loginUser } from "./authService";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const loginUserThunk = createAsyncThunk<AuthPayload, loginData>(
  "auth/loginUser",
  async (data: loginData) => {
    const logedUser = await loginUser(data);
    return logedUser;
  }
);

/*export const restoreSession = createAsyncThunk<AuthPayload, string>(
  "auth/restoreSession",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return {
        token,
        user: response.data,
      };
    } catch {
      return thunkAPI.rejectWithValue("Session expired");
    }
  }
);*/

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    //Login user
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserThunk.fulfilled,
        (state, action: PayloadAction<AuthPayload>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
    /*.addCase(restoreSession.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.token = null;
        state.user = null;
        state.loading = false;
      });*/
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
