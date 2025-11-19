"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export const createSupport = async (supportData: {
    user: string | null | undefined;
    full_name: string | null | undefined;
    email: string | undefined;
    title: string;
    message: string;
    priority: string;
  }) => {
    try {
      const url = `${apiUrl}/user-support`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supportData),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.error(`Failed to create support ticket: ${response.status} ${response.statusText}`);
        return null;
      }

      const result = await response.json();
      
      if (!result) {
        throw new Error("Invalid response format");
      }

      return result;
    } catch (error) {
      console.error("Create Support API Error:", error);
      return null;
    }
  };

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

