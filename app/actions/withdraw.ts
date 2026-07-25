// Client-compatible withdraw API helpers

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const withdraw = async (
  withdrawData: {
    token_name: string;
    amount: number;
    token_withdraw_address: string;
    user?: string | null;
    status?: string;
  },
  authToken?: string | null
) => {
  try {
    const withdrawPayload = {
      token_name: withdrawData.token_name,
      amount: withdrawData.amount,
      token_withdraw_address: withdrawData.token_withdraw_address,
      status: withdrawData.status || "pending",
    };

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

    const response = await fetch(`${apiUrl}/withdraws`, {
      method: "POST",
      headers,
      body: JSON.stringify(withdrawPayload),
      cache: "no-store",
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error(`Failed to create withdrawal: ${response.status}`, result);
      return {
        success: false,
        message: result?.message || `Failed to create withdrawal (${response.status})`,
        code: result?.code,
      };
    }

    return result;
  } catch (error) {
    console.error("Withdraw API Error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create withdrawal",
    };
  }
};
