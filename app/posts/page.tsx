"use client";

import { useGetPostsQuery } from "@/lib/redux/services/postsApi";
import Table from "../components/Table/Table";

export default function PostsPage() {
  const { data, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data && error) {
    return <div>Connection error</div>;
  }

  return (
    <>
      <Table posts={data!} />
    </>
  );
}
