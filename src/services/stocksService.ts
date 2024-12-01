import { StocksResponse } from "../types/stock";
import { mockStocks } from "../data/mockStocks";

const API_KEY = "pQxW8kAB7_bwQpk4UazWgEhevi8tGfxw";
const BASE_URL = "https://api.polygon.io/v3/reference/tickers";
const USE_MOCK = true;

const filterMockStocks = (
  search: string = "",
  page: number = 1
): StocksResponse => {
  const filteredStocks = mockStocks
    .filter((stock) =>
      search
        ? stock.ticker.toLowerCase().includes(search.toLowerCase()) ||
          stock.name.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .map((stock) => ({
      ...stock,
      id: stock.ticker,
    }));

  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const paginatedStocks = filteredStocks.slice(
    startIndex,
    startIndex + pageSize
  );
  const hasMore = startIndex + pageSize < filteredStocks.length;

  return {
    results: paginatedStocks,
    count: filteredStocks.length,
    next_url: hasMore ? `mock_page_${page + 1}` : null,
  };
};

const abortController = new AbortController();

export const fetchStocksData = async (
  search?: string,
  nextUrl?: string
): Promise<StocksResponse> => {
  if (USE_MOCK) {
    const page = nextUrl ? parseInt(nextUrl.split("_")[2]) || 1 : 1;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterMockStocks(search, page));
      }, 500);
    });
  }

  const url =
    nextUrl ||
    `${BASE_URL}?market=stocks&active=true&limit=20${
      search ? `&search=${search}` : ""
    }`;

  if (!API_KEY) {
    throw new Error(
      "API key is not configured. Please add your Polygon.io API key to the .env file."
    );
  }

  const response = await fetch(`${url}&apiKey=${API_KEY}`);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
      // cancel all requests here
    }
    throw new Error("Failed to fetch stock data");
  }
  console.log(response.json());
  return response.json();
};

// process.env.POLYGON_API_KEY
