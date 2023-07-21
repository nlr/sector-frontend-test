interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
}) => (
  <div className="relative mb-4 mt-6 lg:w-2/4">
    <input
      type="search"
      id="search"
      className="placeholder:text-[#B2B7BF] block w-full p-4 lg:pl-7 text-sm text-white bg-[#5A5C66] focus:ring-blue-500 focus:border-blue-500"
      placeholder="Поиск"
      value={value}
      onChange={onChange}
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
      <svg
        className="w-4 h-4 text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  </div>
);
