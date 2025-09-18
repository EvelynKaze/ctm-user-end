"use server";

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const fetchTransactions = async (user_id: string) => {
    try {
      if (!user_id) {
        console.error("User ID is required for fetching transactions");
        return { deposits: [], withdraws: [] };
      }

      // Fetch deposits and withdrawals in parallel
      const [depositsResponse, withdrawsResponse] = await Promise.all([
        fetch(`${apiUrl}/deposits/user/${user_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: 'no-store',
        }),
        fetch(`${apiUrl}/withdraws/user/${user_id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: 'no-store',
        })
      ]);

      let deposits = [];
      let withdraws = [];

      // Handle deposits response
      if (depositsResponse.ok) {
        const depositsResult = await depositsResponse.json();
        if (depositsResult && depositsResult.success) {
          deposits = depositsResult.data || [];
        }
      } else {
        console.error(`Failed to fetch deposits: ${depositsResponse.status} ${depositsResponse.statusText}`);
      }

      // Handle withdrawals response
      if (withdrawsResponse.ok) {
        const withdrawsResult = await withdrawsResponse.json();
        if (withdrawsResult && withdrawsResult.success) {
          withdraws = withdrawsResult.data || [];
        }
      } else {
        console.error(`Failed to fetch withdrawals: ${withdrawsResponse.status} ${withdrawsResponse.statusText}`);
      }

      return { deposits, withdraws };
    } catch (error) {
      console.error("Fetch Transactions API Error:", error);
      return { deposits: [], withdraws: [] };
    }
  };  