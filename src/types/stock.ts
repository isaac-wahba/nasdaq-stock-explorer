export interface Stock {
  id?: string; // Add optional id field for unique identification
  ticker: string;
  name: string;
  market: string;
  locale: string;
  active: boolean;
}

export interface StocksResponse {
  results: Stock[];
  count: number;
  next_url: string | null;
}

export interface StocksState {
  stocks: Stock[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  hasMore: boolean;
}
