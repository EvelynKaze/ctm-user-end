"use server";

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface CryptoPricesResponse {
  success: boolean;
  data: CryptoPrice[];
}

interface CachedCryptoPrices {
  data: CryptoPricesResponse;
  timestamp: number;
}

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

// Cache duration: 1 minute for prices
const CACHE_DURATION = 1 * 60 * 1000;
let cryptoPricesCache: CachedCryptoPrices | null = null;

export const fetchCryptoPrices = async (): Promise<CryptoPricesResponse | null> => {
  try {
    // Check cache first
    if (cryptoPricesCache && Date.now() - cryptoPricesCache.timestamp < CACHE_DURATION) {
      console.log("Returning cached crypto prices");
      return cryptoPricesCache.data;
    }

    const url = `${apiUrl}/crypto/prices`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Failed to fetch crypto prices: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: CryptoPricesResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid response format");
    }

    // Cache the result
    cryptoPricesCache = {
      data: result,
      timestamp: Date.now()
    };

    console.log("Cached new crypto prices data");
    return result;
  } catch (error) {
    console.error("Fetch Crypto Prices API Error:", error);
    return null;
  }
};