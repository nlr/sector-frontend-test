import { Post, SortType } from "@/app/types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { tableColumns } from "@/lib/utils/helpers";

export interface TableSliceState {
  sortOrder: SortType;
  currentPage: number;
  searchQuery: string;
  sortColumn: string;
}

const initialState: TableSliceState = {
  sortOrder: SortType.ASC,
  currentPage: 1,
  searchQuery: "",
  sortColumn: tableColumns[0].key,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortColumn(state, action: PayloadAction<string>) {
      state.sortColumn = action.payload;
    },
    toggleSortOrder: (state) => {
      if (state.sortOrder === SortType.ASC) {
        state.sortOrder = SortType.DESC;
      } else if (state.sortOrder === SortType.DESC) {
        state.sortOrder = SortType.ASC;
        state.sortColumn = initialState.sortColumn;
      }
    },
  },
});
