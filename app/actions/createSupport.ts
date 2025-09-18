"use server";

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

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