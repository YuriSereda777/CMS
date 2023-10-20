import SearchBar from "../../UI/SearchBar";

const TableSearchInput = ({ searchInputValue, searchHandler }) => {
  return (
    <div className="w-1/3">
      <SearchBar
        value={searchInputValue}
        onChange={(e) => searchHandler(e.target.value)}
      />
    </div>
  );
};

export default TableSearchInput;
