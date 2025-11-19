"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const withdraw = async (withdrawData: {
    token_name: string;
    amount: number;
    token_withdraw_address: string;
    user: string | null | undefined;
    status?: string;
  }) => {
    try {
      // Add default status as pending
      const withdrawPayload = {
        ...withdrawData,
        status: withdrawData.status || "pending"
      };

      const url = `${apiUrl}/withdraws`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withdrawPayload),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`Failed to create withdrawal: ${response.status} ${response.statusText}`);
        return null;
      }

      const result = await response.json();
      
      if (!result) {
        throw new Error("Invalid response format");
      }

      return result;
    } catch (error) {
      console.error("Withdraw API Error:", error);
      return null;
    }
  };  