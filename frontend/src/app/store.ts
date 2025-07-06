import { configureStore } from "@reduxjs/toolkit";
import sitesReducer from "../features/sites/sitesSlice";
import stagesReducer from "../features/stages/stageSlice";
import siteStagesReducer from "../features/siteStages/siteStagesSlice";

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    stages: stagesReducer,
    siteStages: siteStagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
