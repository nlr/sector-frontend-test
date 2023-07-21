import {
  selectCurrentPage,
  tableSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";

interface PaginationProps {
  totalPages: number;
}
export const Pagination = ({ totalPages }: PaginationProps) => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const handlePaginationItemClick = (pageNumber: number) => {
    dispatch(tableSlice.actions.setCurrentPage(pageNumber));
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between max-w-full text-2xl font-medium">
      <button
        className="pl-1 lg:pl-6 disabled:text-gray-200"
        disabled={currentPage === 1}
        onClick={() =>
          dispatch(tableSlice.actions.setCurrentPage(currentPage - 1))
        }
      >
        Назад
      </button>
      <div className="text-lg p-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 lg:mx-2 italic ${
              index + 1 === currentPage ? "text-[#7EBC3C]" : ""
            }`}
            onClick={() => handlePaginationItemClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        className="pr-1 lg:pr-4 disabled:text-gray-200 "
        disabled={currentPage === totalPages}
        onClick={() =>
          dispatch(tableSlice.actions.setCurrentPage(currentPage + 1))
        }
      >
        Далее
      </button>
    </div>
  );
};
