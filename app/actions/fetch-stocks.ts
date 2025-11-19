"use server";
import { StocksApiResponse } from "@/types/stock";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export type ExchangeType = "nasdaq" | "nyse" | "amex";

export const fetchStocks = async (
  exchange: ExchangeType = "nasdaq", 
  page: number = 1, 
  search?: string
): Promise<StocksApiResponse | null> => {
  try {
    // Build URL with query parameters
    const params = new URLSearchParams({
      page: page.toString(),
    });
    
    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    const url = `${apiUrl}/stocks/exchange/${exchange}?${params.toString()}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch stocks: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: StocksApiResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid response format");
    }

    return result;
  } catch (error) {
    console.error("Fetch Stocks API Error:", error);
    return null;
  }
};

// Convenience functions for each exchange
export const fetchNasdaqStocks = async (page: number = 1, search?: string) => 
  fetchStocks("nasdaq", page, search);

export const fetchNyseStocks = async (page: number = 1, search?: string) => 
  fetchStocks("nyse", page, search);

export const fetchAmexStocks = async (page: number = 1, search?: string) => 
  fetchStocks("amex", page, search);
  