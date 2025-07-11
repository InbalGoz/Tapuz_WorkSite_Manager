import { configureStore } from "@reduxjs/toolkit";
import sitesReducer from "../features/sites/sitesSlice";
import stagesReducer from "../features/stages/stageSlice";
import siteStagesReducer from "../features/siteStages/siteStagesSlice";
import workHoursReducer from "../features/workHours/workHoursSlice";
import employeesReducer from "../features/employee/employeeSlice";
import stageStatusesReducer from "../features/stageStatuses/stageStatusesSlice";

export const store = configureStore({
  reducer: {
    sites: sitesReducer,
    stages: stagesReducer,
    siteStages: siteStagesReducer,
    workHours: workHoursReducer,
    employees: employeesReducer,
    stageStatus: stageStatusesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
