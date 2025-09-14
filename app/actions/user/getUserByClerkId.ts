"use server";

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface UserData {
  _id: string;
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  roi: number;
  role: string;
  kycStatus: boolean;
  currentValue: number;
  accountStatus: boolean;
  totalInvestment: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export async function getUserByClerkId(clerkId: string): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`${apiUrl}/users/clerk/${clerkId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      console.error(`Failed to fetch user: ${response.status} ${response.statusText}`);
      return null;
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user by clerkId:", error);
    return null;
  }
}