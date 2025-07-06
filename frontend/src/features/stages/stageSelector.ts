import type { RootState } from "../../app/store";

export const selectAllStages = (state: RootState) => state.stages.all_stages;
