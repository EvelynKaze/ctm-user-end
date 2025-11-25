"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface KYCSubmissionRequest {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  validIdUrl: string;
  passportUrl: string;
  validIdFileName: string;
  passportFileName: string;
  validIdFileSize: string;
  passportFileSize: string;
}

export interface KYCSubmissionResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export const submitKYC = async (
  kycData: KYCSubmissionRequest,
  authToken: string
): Promise<KYCSubmissionResponse | null> => {
  try {
    if (!authToken) {
      console.error("Authentication token is required");
      return null;
    }

    const url = `${apiUrl}/kyc/submit`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
      body: JSON.stringify(kycData),
      cache: 'no-store',
    });

    const result: KYCSubmissionResponse = await response.json();

    if (!response.ok) {
      console.error(`Failed to submit KYC: ${response.status} ${response.statusText}`, result);
      return result;
    }

    if (!result.success) {
      console.error("KYC submission failed:", result.message);
      return result;
    }

    return result;
  } catch (error) {
    console.error("KYC Submission API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

