// Client-compatible transaction history helpers

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const fetchTransactions = async (
  user_id: string,
  authToken?: string | null
) => {
  try {
    if (!user_id) {
      console.error("User ID is required for fetching transactions");
      return { deposits: [], withdraws: [] };
    }

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

    const [depositsResponse, withdrawsResponse] = await Promise.all([
      fetch(`${apiUrl}/deposits/user/${user_id}`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
      fetch(`${apiUrl}/withdraws/user/${user_id}`, {
        method: "GET",
        headers,
        cache: "no-store",
      }),
    ]);

    let deposits = [];
    let withdraws = [];

    if (depositsResponse.ok) {
      const depositsResult = await depositsResponse.json();
      if (depositsResult?.success) {
        deposits = depositsResult.data || [];
      }
    } else {
      console.error(
        `Failed to fetch deposits: ${depositsResponse.status} ${depositsResponse.statusText}`
      );
    }

    if (withdrawsResponse.ok) {
      const withdrawsResult = await withdrawsResponse.json();
      if (withdrawsResult?.success) {
        withdraws = withdrawsResult.data || [];
      }
    } else {
      console.error(
        `Failed to fetch withdrawals: ${withdrawsResponse.status} ${withdrawsResponse.statusText}`
      );
    }

    return { deposits, withdraws };
  } catch (error) {
    console.error("Fetch Transactions API Error:", error);
    return { deposits: [], withdraws: [] };
  }
};
