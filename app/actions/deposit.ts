"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const createDeposit = async (data: {
    token_name: string;
    amount: number;
    token_deposit_address: string;
    user: string | null | undefined;
    status?: string;
  }) => {
    try {
      // Add default status if not provided
      const depositPayload = {
        ...data,
        status: data.status || "pending"
      };

      const url = `${apiUrl}/deposits`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depositPayload),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`Failed to create deposit: ${response.status} ${response.statusText}`);
        return null;
      }

      const result = await response.json();
      
      if (!result) {
        throw new Error("Invalid response format");
      }

      return result;
    } catch (error) {
      console.error("Create Deposit API Error:", error);
      return null;
    }
  };  