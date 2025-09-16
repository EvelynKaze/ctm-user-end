"use server";

export interface CryptoOption {
  _id: string;
  token_name: string;
  token_address: string;
  user: string;
  token_symbol: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FetchCryptoOptionsResponse {
  success: boolean;
  data: CryptoOption[];
  count: number;
}

interface CachedCryptoData {
  data: FetchCryptoOptionsResponse;
  timestamp: number;
}

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
let cryptoCache: CachedCryptoData | null = null;

export const fetchCryptocurrencies = async (): Promise<FetchCryptoOptionsResponse | null> => {
  try {
    // Check cache first
    if (cryptoCache && Date.now() - cryptoCache.timestamp < CACHE_DURATION) {
      console.log("Returning cached crypto options");
      return cryptoCache.data;
    }

    const url = `${apiUrl}/crypto-options`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch crypto options: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: FetchCryptoOptionsResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid response format");
    }

    // Cache the result
    cryptoCache = {
      data: result,
      timestamp: Date.now()
    };

    console.log("Cached new crypto options data");
    return result;
  } catch (error) {
    console.error("Fetch Crypto Options API Error:", error);
    return null;
  }
};
  