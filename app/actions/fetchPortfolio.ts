"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface TokenHolding {
  tokenName: string;
  amount: number;
  averageAcquisitionPrice: number;
  currentPrice: number;
  totalInvestedUsd: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  lastUpdated: string;
}

export interface PortfolioData {
  userId: string;
  holdings: TokenHolding[];
  totalCurrentValue: number;
  totalInvestedValue: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
}

export interface PortfolioApiResponse {
  success: boolean;
  data: PortfolioData;
  message?: string;
}

export const fetchPortfolio = async (token: string): Promise<PortfolioData | null> => {
  try {
    if (!token) {
      console.error("Authentication token is required for fetching portfolio");
      return null;
    }

    const url = `${apiUrl}/portfolio/my-portfolio`;
    
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
      console.error(`Failed to fetch portfolio: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: PortfolioApiResponse = await response.json();

    if (!result.success || !result.data) {
      console.error("Invalid response format from portfolio API:", result);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Fetch Portfolio API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

