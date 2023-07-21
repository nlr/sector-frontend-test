import { Post } from "@/app/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({ query: () => "posts" }),
  }),
});

export const { useGetPostsQuery } = postsApi;
