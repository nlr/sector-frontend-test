interface TableRowProps {
  data: any;
}

const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tr className="bg-white border border-[#E3E6EC] text-xs font-medium">
      <td className="w-1/12 text-center px-6 py-4 border border-[#E3E6EC]">
        {data.id}
      </td>
      <td className="w-1/2 px-6 py-4 border border-[#E3E6EC]">{data.title}</td>
      <td className="w-1/3 px-6 py-4 border border-[#E3E6EC]">{data.body}</td>
    </tr>
  );
};

export default TableRow;
