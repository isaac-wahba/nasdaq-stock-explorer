import React, { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStocks } from "../../store/stocksSlice";
import { Stock } from "../../types/stock";
import { TrendingUp } from "lucide-react";

export const StockList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, isLoading, error, hasMore, searchTerm } = useSelector(
    (state: RootState) => state.stocks
  );

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(
        fetchStocks({
          search: searchTerm,
          nextUrl:
            stocks.length > 0
              ? `mock_page_${Math.ceil(stocks.length / 5) + 1}`
              : undefined,
        })
      );
    }
  }, [dispatch, isLoading, hasMore, searchTerm, stocks.length]);

  useEffect(() => {
    if (stocks.length === 0) {
      loadMore();
    }
  }, [stocks.length, loadMore]);

  useEffect(() => {
    if (inView && stocks.length > 0) {
      loadMore();
    }
  }, [inView, loadMore]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stocks.map((stock: Stock) => (
        <div
          key={stock.ticker} // Use ticker as the unique key
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {stock.ticker}
              </h3>
              <p className="text-sm text-gray-600">{stock.name}</p>
            </div>
          </div>
        </div>
      ))}

      <div ref={ref} className="h-20 flex items-center justify-center">
        {isLoading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        )}
      </div>
    </div>
  );
};
