"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const fetchSupport = async (user_id: string) => {
    try {
      if (!user_id) {
        console.error("User ID is required for fetching support requests");
        return null;
      }
  
      const url = `${apiUrl}/user-support/user/${user_id}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: 'no-store',
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch support requests: ${response.status} ${response.statusText}`);
        return null;
      }

      const result = await response.json();
      
      if (!result || !result.success) {
        console.error("Invalid response format from support API");
        return null;
      }
  
      return result.data || [];
    } catch (error) {
      console.error("Fetch Support API Error:", error);
      return null;
    }
  };
  