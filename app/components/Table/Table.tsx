"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

import { SearchInput } from "./SearchInput";
import { Post, SortType } from "@/app/types/types";
import { Pagination } from "../Pagination/Pagination";
import { tableColumns } from "@/lib/utils/helpers";
import { useDispatch, useSelector } from "@/lib/redux/store";
import {
  tableSlice,
  selectSearchQuery,
  selectCurrentPage,
  selectSortColumn,
  selectSortOrder,
} from "@/lib/redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Table = ({ posts }: { posts: Post[] }) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchQuery);
  const currentPage = useSelector(selectCurrentPage);
  const sortColumn = useSelector(selectSortColumn);
  const sortOrder = useSelector(selectSortOrder);

  const query = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const filteredAndSortedPosts = useMemo(() => {
    let filteredAndSorted = [...posts];

    if (searchValue !== "") {
      filteredAndSorted = filteredAndSorted.filter(
        (post) =>
          post.id.toString().includes(searchValue) ||
          post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          post.body.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortColumn) {
      filteredAndSorted.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        const sortResult =
          typeof valueA === "number" && typeof valueB === "number"
            ? valueA - valueB
            : String(valueA).localeCompare(String(valueB));
        return sortOrder === SortType.ASC ? sortResult : -sortResult;
      });
    }
    return filteredAndSorted;
  }, [posts, searchValue, sortColumn, sortOrder]);

  const itemsPerPage = 10;
  const totalItems = filteredAndSortedPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  useLayoutEffect(() => {
    if (currentPage !== 1) {
      dispatch(tableSlice.actions.setCurrentPage(1));
    }
  }, [searchValue]);

  const currentPageFromQuery = parseInt(query.get("page") || "1", 10);
  const isPageFromQuerySet = useRef(false);

  useEffect(() => {
    const url = pathName + "?page=" + currentPage;
    router.push(url);
  }, [router, currentPage]);

  useEffect(() => {
    if (!isPageFromQuerySet.current) {
      const isValidPage = totalPages > 0 && currentPageFromQuery <= totalPages;
      if (isValidPage) {
        dispatch(tableSlice.actions.setCurrentPage(currentPageFromQuery));
        isPageFromQuerySet.current = true;
      } else {
        router.push(pathName);
      }
    }
  }, [router, currentPageFromQuery, currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(tableSlice.actions.setSearchQuery(event.target.value));
  };

  return (
    <div className="relative overflow-x-auto min-w-full">
      <SearchInput value={searchValue} onChange={handleSearchChange} />
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
        {totalItems > 0 && <TableHeader columns={tableColumns} />}
        <tbody>
          {totalItems <= 0 && (
            <tr>
              <td colSpan={3} className="text-2xl text-center py-14">
                Ничего не найдено
              </td>
            </tr>
          )}
          {filteredAndSortedPosts.slice(startIndex, endIndex).map((user) => (
            <TableRow key={user.id} data={user} />
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Table;
