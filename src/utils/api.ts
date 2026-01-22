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
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const res = await fetch(
      `${endpoint}?appId=${appId}&origin=${encodeURIComponent(origin)}`,
    );
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
