"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface ValidateWithdrawalRequest {
  tokenName: string;
  amount: number;
}

export interface ValidateWithdrawalSuccess {
  valid: true;
  tokenAmount: number;
  currentPrice: number;
  usdValue: number;
  availableAmount: number;
}

export interface ValidateWithdrawalError {
  valid: false;
  reason: string;
  code: "TOKEN_NOT_IN_PORTFOLIO" | "INSUFFICIENT_TOKEN_BALANCE";
  requested?: number;
  available?: number;
  deficit?: number;
  availableTokens?: Array<{
    tokenName: string;
    amount: number;
    averagePrice: number;
  }>;
}

export interface ValidateWithdrawalResponse {
  success: boolean;
  data: ValidateWithdrawalSuccess | ValidateWithdrawalError;
  message?: string;
}

export const validateWithdrawal = async (
  request: ValidateWithdrawalRequest,
  authToken: string
): Promise<ValidateWithdrawalSuccess | ValidateWithdrawalError | null> => {
  try {
    if (!authToken || !request.tokenName || !request.amount) {
      console.error("Authentication token, tokenName, and amount are required");
      return null;
    }

    const url = `${apiUrl}/portfolio/validate-withdrawal`;
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        tokenName: request.tokenName,
        amount: request.amount,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Failed to validate withdrawal: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: ValidateWithdrawalResponse = await response.json();

    if (!result.data) {
      console.error("Invalid response format from validation API:", result);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Validate Withdrawal API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

