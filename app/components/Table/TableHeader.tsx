import { SortType } from "@/app/types/types";
import {
  selectSortColumn,
  selectSortOrder,
  tableSlice,
  useDispatch,
  useSelector,
} from "@/lib/redux";

type column = { key: string; label: string };

interface TableHeaderProps {
  columns: column[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  const dispatch = useDispatch();

  const sortColumn = useSelector(selectSortColumn);
  const sortOrder = useSelector(selectSortOrder);
  const isSortIconVisible = (column: string) => {
    return column === sortColumn && sortOrder !== SortType.NONE;
  };

  const handleOnClick = (columnKey: string) => {
    if (sortColumn === columnKey) {
      dispatch(tableSlice.actions.toggleSortOrder());
    } else {
      dispatch(tableSlice.actions.setSortColumn(columnKey));
    }
  };

  return (
    <thead className="font-semibold text-center text-white text-sm bg-[#474955]">
      <tr>
        {columns.map((column) => (
          <th
            scope="col"
            className="px-6 py-3 first:w-1/12"
            key={column.key}
            onClick={() => handleOnClick(column.key)}
          >
            <div className="flex items-center justify-center">
              <span className="mr-1 lg:mr-8">{column.label}</span>
              {isSortIconVisible(column.key) && (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/qbtr71xwxvf-201%3A19?alt=media&token=3330ee21-13a2-4428-a1c0-03195e84330e"
                  alt="arrow"
                  className={`${
                    sortOrder === SortType.DESC ? "rotate-180" : ""
                  } w-[11.66px] h-[5.83px]`}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
