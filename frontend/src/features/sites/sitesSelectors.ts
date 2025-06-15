//import { createSelector } from "reselect";
import type { RootState } from "../../app/store";

export const selectAllSites = (state: RootState) => state.sites.all_sites;
export const selectAllSitesLoading = (state: RootState) => state.sites.loading;
export const selectAllSitesError = (state: RootState) => state.sites.error;
//export const selectSiteById = (id: number) =>
// createSelector(selectSites, (sites: Site[]) => sites.find(site => site.id === id));
