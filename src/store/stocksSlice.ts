import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Stock, StocksResponse, StocksState } from "../types/stock";
import { fetchStocksData } from "../services/stocksService";

export const fetchStocks = createAsyncThunk(
  "stocks/fetchStocks",
  async (
    { search, nextUrl }: { search?: string; nextUrl?: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchStocksData(search, nextUrl);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const initialState: StocksState = {
  stocks: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  hasMore: true,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.stocks = [];
      state.hasMore = true;
      state.error = null;
    },
    clearStocks: (state) => {
      state.stocks = [];
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        const uniqueStocks = new Map(
          state.stocks.map((stock) => [stock.ticker, stock])
        );
        action.payload.results.forEach((stock) => {
          uniqueStocks.set(stock.ticker, stock);
        });
        state.stocks = Array.from(uniqueStocks.values());
        state.hasMore = !!action.payload.next_url;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, clearStocks } = stocksSlice.actions;
export default stocksSlice.reducer;
