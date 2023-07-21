import { postsApi } from "./services/postsApi";
import { tableSlice } from "./slices";

export const reducer = {
  table: tableSlice.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
};
