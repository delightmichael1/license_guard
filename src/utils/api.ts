import { DEFAULT_API_ENDPOINT } from "./constants";

export interface ValidationResponse {
  status: "OK" | "MAINTENANCE";
  message?: string;
}

export async function validateApp(
  appId: string,
  apiEndpoint?: string,
): Promise<ValidationResponse> {
  const endpoint = apiEndpoint || DEFAULT_API_ENDPOINT;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-App-Id": appId,
      },
    });
    if (!res.ok) {
      return { status: "MAINTENANCE", message: "Server error" };
    }
    const data: ValidationResponse = await res.json();
    return data;
  } catch (err) {
    console.error("App validation failed", err);
    return { status: "MAINTENANCE", message: "Network error" };
  }
}
