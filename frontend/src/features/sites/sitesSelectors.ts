import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const selectAllSites = (state: RootState) => state.sites.all_sites;
export const selectAllSitesLoading = (state: RootState) => state.sites.loading;
export const selectAllSitesError = (state: RootState) => state.sites.error;
export const selectSelectedSite = (state: RootState) =>
  state.sites.selected_site;
export const selectActiveSites = createSelector([selectAllSites], (allSites) =>
  allSites.filter((site) => !site.isFinished)
);
export const selectFinishedSites = createSelector(
  [selectAllSites],
  (allSites) => allSites.filter((site) => site.isFinished)
);
/*export const selectActiveSites = (state: RootState) =>
  state.sites.all_sites.filter((site) => !site.isFinished);
export const selectFinishedSites = (state: RootState) =>
  state.sites.all_sites.filter((site) => site.isFinished);*/
//export const selectSiteById = (id: number) =>
// createSelector(selectSites, (sites: Site[]) => sites.find(site => site.id === id));
