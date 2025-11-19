"use server";
import { CopyTradingOption } from "@/types/dashboard";

// Prefer NEXT_PUBLIC_API_URL for consistency, fallback to production URL, then localhost
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface CopyTradingApiResponse {
  success: boolean;
  data: CopyTradingOption[];
}

export const fetchTrades = async (): Promise<CopyTradingOption[] | null> => {
  try {
    const url = `${apiUrl}/copytrading-options/`;
    console.log("Fetching trades from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Failed to fetch copy trading options: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: CopyTradingApiResponse = await response.json();

    if (!result.success || !result.data) {
      console.error("Invalid response format:", result);
      throw new Error("Invalid response format");
    }

    console.log("Trades fetched successfully", result.data)
    return result.data;
  } catch (error) {
    console.error("Fetch Trades API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};
  