"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const createCopyTrade = async ({ 
  data, 
  initial_investment,
  trade_title,
  trade_token,
  trade_token_address, 
  trade_status,
  trade_duration,
  user,
}: {
  data: {
    trade_min: number;
    trade_max: number;
    trade_roi_min: number;
    trade_roi_max: number;
    trade_risk: string;
  };
  initial_investment: number;
  trade_title: string;
  trade_token: string;
  trade_token_address: string;
  trade_duration: number;
  trade_status: string;
  user: string | null | undefined;
}) => {
  // Calculate profit/loss ratio
  const trade_profit_loss = data.trade_roi_max !== 0 
    ? data.trade_roi_min / data.trade_roi_max 
    : 0; // Prevent division by zero

  const copyTradePayload = data && trade_title?.trim() !== "" 
    ? {
      user,
      trade_title,
      trade_min: data.trade_min,
      trade_max: data.trade_max,
      trade_roi_min: data.trade_roi_min,
      trade_roi_max: data.trade_roi_max,
      trade_win_rate: 0.0,
      trade_risk: data.trade_risk,
      trade_current_value: 0.0,
      trade_profit_loss, // Using the calculated value
      trade_duration,
      isProfit: false,
      initial_investment,
      trade_token,
      trade_token_address,
      trade_status,
    } 
    : null;

  try {
    if (!copyTradePayload) {
      throw new Error("Invalid copy trade data");
    }

    const url = `${apiUrl}/copytrade-purchases`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(copyTradePayload),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Failed to create copy trade: ${response.status} ${response.statusText}`);
      return null;
    }

    const result = await response.json();
    
    if (!result) {
      throw new Error("Invalid response format");
    }

    return result;
  } catch (error) {
    console.error("Create Copy Trade API Error:", error);
    return null;
  }
};