"use server";

const apiUrl = process.env.API_URL || "https://ctm-backend-production.up.railway.app/api/v1";

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    publicId: string;
    filename: string;
    size: number;
    format: string;
  };
}

export const uploadFile = async (
  file: File,
  authToken: string
): Promise<UploadResponse | null> => {
  try {
    if (!file) {
      console.error("No file provided");
      return null;
    }

    if (!authToken) {
      console.error("Authentication token is required");
      return null;
    }

    const formData = new FormData();
    formData.append("document", file);

    const url = `${apiUrl}/uploads/upload`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
      body: formData,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details');
      console.error(`Failed to upload file: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const result: UploadResponse = await response.json();

    if (!result.success) {
      console.error("Upload failed:", result.message);
      return null;
    }

    return result;
  } catch (error) {
    console.error("Upload API Error:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    }
    return null;
  }
};

