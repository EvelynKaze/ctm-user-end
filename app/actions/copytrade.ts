"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface CreateCopyTradeRequest {
  copytradeOptionId: string;
  initial_investment: number;
}

export interface CopyTradePurchase {
  _id: string;
  user: string;
  copytradeOption: string;
  trade_title: string;
  trade_min: number;
  trade_max: number;
  trade_risk: string;
  trade_roi_min: number;
  trade_roi_max: number;
  trade_duration: number;
  initial_investment: number;
  trade_current_value: number;
  trade_profit_loss: number;
  trade_status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCopyTradeResponse {
  success: boolean;
  message: string;
  data: {
    purchase: CopyTradePurchase;
    note: string;
  };
}

export interface CreateCopyTradeError {
  success: false;
  message: string;
  error?: string;
  data?: {
    investment?: number;
    minimum?: number;
    required?: number;
    available?: number;
    deficit?: number;
    tradeTitle?: string;
  };
}

export const createCopyTrade = async (
  request: CreateCopyTradeRequest,
  authToken: string
): Promise<CreateCopyTradeResponse | CreateCopyTradeError | null> => {
  try {
    if (!authToken) {
      console.error("Authentication token is required");
      return null;
    }

    if (!request.copytradeOptionId || !request.initial_investment) {
      console.error("copytradeOptionId and initial_investment are required");
      return null;
    }

    const url = `${apiUrl}/copytrade-purchases`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        copytradeOptionId: request.copytradeOptionId,
        initial_investment: request.initial_investment,
      }),
      cache: 'no-store',
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`Failed to create copy trade: ${response.status} ${response.statusText}`, result);
      return result as CreateCopyTradeError;
    }

    if (!result.success) {
      console.error("Invalid response format:", result);
      return result as CreateCopyTradeError;
    }

    return result as CreateCopyTradeResponse;
  } catch (error) {
    console.error("Create Copy Trade API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

// Fetch user's copytrade purchases
export interface UserCopyTradePurchase {
  _id: string;
  trade_title: string;
  initial_investment: number;
  trade_current_value: number;
  trade_profit_loss: number;
  trade_status: string;
  trade_roi_min: number;
  trade_roi_max: number;
  trade_duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchUserPurchasesResponse {
  success: boolean;
  data: UserCopyTradePurchase[];
  count: number;
}

export const fetchUserCopytradePurchases = async (
  authToken: string
): Promise<UserCopyTradePurchase[] | null> => {
  try {
    if (!authToken) {
      console.error("Authentication token is required");
      return null;
    }

    const url = `${apiUrl}/copytrade-purchases/my-purchases`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    };

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Failed to fetch copytrade purchases: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: FetchUserPurchasesResponse = await response.json();

    if (!result.success || !result.data) {
      console.error("Invalid response format from copytrade purchases API:", result);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Fetch Copytrade Purchases API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};