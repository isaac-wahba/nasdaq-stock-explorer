import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import { Search } from "lucide-react";
import debounce from "lodash/debounce";
import {
  clearStocks,
  fetchStocks,
  setSearchTerm,
} from "../../store/stocksSlice";

export const SearchBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.stocks.searchTerm);

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(clearStocks());
      dispatch(fetchStocks({ search: term }));
    }, 300),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
    debouncedSearch(term);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search stocks..."
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};
