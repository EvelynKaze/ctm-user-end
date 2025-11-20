"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface AvailableToken {
  tokenName: string;
  amount: number;
  averagePrice: number;
}

export interface AvailableTokensResponse {
  success: boolean;
  data: AvailableToken[];
  message?: string;
}

export const fetchAvailableTokens = async (token: string): Promise<AvailableToken[] | null> => {
  try {
    if (!token) {
      console.error("Authentication token is required for fetching available tokens");
      return null;
    }

    const url = `${apiUrl}/portfolio/my-available-tokens`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Failed to fetch available tokens: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: AvailableTokensResponse = await response.json();

    if (!result.success || !result.data) {
      console.error("Invalid response format from available tokens API:", result);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Fetch Available Tokens API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

