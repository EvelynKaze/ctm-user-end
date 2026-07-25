"use server";

const apiUrl =
  process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface StockPurchase {
  _id: string;
  user: string;
  symbol: string;
  name: string;
  exchange: string;
  quantity: number;
  purchase_price: number;
  initial_investment: number;
  stock_status:
    | "pending"
    | "active"
    | "pending_liquidation"
    | "completed"
    | "cancelled";
  current_price?: number | null;
  current_value?: number | null;
  profit_loss?: number | null;
  isProfit?: boolean | null;
  admin_final_value?: number | null;
  admin_is_profit?: boolean | null;
  liquidation_requested_at?: string | null;
  approved_at?: string | null;
  liquidated_at?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createStockPurchase(
  payload: { symbol: string; quantity: number },
  authToken: string
): Promise<{ success: boolean; message?: string; data?: { purchase: StockPurchase }; errorData?: unknown } | null> {
  try {
    const response = await fetch(`${apiUrl}/stock-purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create stock purchase",
        errorData: result.data,
      };
    }
    return result;
  } catch (error) {
    console.error("Create stock purchase error:", error);
    return null;
  }
}

export async function fetchMyStockPurchases(
  authToken: string
): Promise<StockPurchase[] | null> {
  try {
    const response = await fetch(`${apiUrl}/stock-purchases/my-purchases`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch stock purchases:", response.status);
      return null;
    }

    const result = await response.json();
    if (!result.success || !result.data) return null;
    return result.data;
  } catch (error) {
    console.error("Fetch stock purchases error:", error);
    return null;
  }
}

export async function requestStockLiquidation(
  purchaseId: string,
  authToken: string
): Promise<{ success: boolean; message?: string } | null> {
  try {
    const response = await fetch(
      `${apiUrl}/stock-purchases/${purchaseId}/request-liquidation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        cache: "no-store",
      }
    );

    const result = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to request liquidation",
      };
    }
    return result;
  } catch (error) {
    console.error("Request liquidation error:", error);
    return null;
  }
}
