import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Site } from "../../models/site";
import { fetchAllSites } from "./sitesService";

interface SitesState {
  all_sites: Site[];
  loading: boolean;
  error: string | null;
}

const initialState: SitesState = {
  all_sites: [],
  loading: false,
  error: null,
};

export const loadAllSites = createAsyncThunk("sites/getAllSites", async () => {
  const sites = await fetchAllSites();
  return sites; // TypeScript יגדיר את payload כ־Site[] אוטומטית
});

const sitesSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAllSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadAllSites.fulfilled,
        (state, action: PayloadAction<Site[]>) => {
          state.all_sites = action.payload;
          state.loading = false;
        }
      )
      .addCase(loadAllSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch sites";
      });
  },
});

export default sitesSlice.reducer;
