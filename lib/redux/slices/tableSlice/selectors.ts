import { SortType } from "@/app/types/types";
import type { ReduxState } from "@/lib/redux";

export const selectCurrentPage = (state: ReduxState): number =>
  state.table.currentPage;
export const selectSearchQuery = (state: ReduxState): string =>
  state.table.searchQuery;
export const selectSortColumn = (state: ReduxState): string =>
  state.table.sortColumn;
export const selectSortOrder = (state: ReduxState): SortType =>
  state.table.sortOrder;
