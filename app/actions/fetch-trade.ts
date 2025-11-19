"use server";
import { CopyTradingOption } from "@/types/dashboard";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface CopyTradingApiResponse {
  success: boolean;
  data: CopyTradingOption[];
}

export const fetchTrades = async (): Promise<CopyTradingOption[] | null> => {
  try {
    const response = await fetch(`${apiUrl}/copytrading-options/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch copy trading options: ${response.status} ${response.statusText}`);
      return null;
    }

    const result: CopyTradingApiResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error("Invalid response format");
    }

    console.log("Trades fetched successfully", result.data)
    return result.data;
  } catch (error) {
    console.error("Fetch Trades API Error:", error);
    return null;
  }
};
  