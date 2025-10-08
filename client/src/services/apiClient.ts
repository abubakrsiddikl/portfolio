import { env } from "@/config/env";
import { IErrorResponse, IResponse } from "@/types";

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<IResponse<T>> {
  try {
    const response = await fetch(`${env.baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    //  Parse JSON safely
    const data = await response.json();

    //  If response not OK → throw typed error
    if (!response.ok) {
      const error: IErrorResponse = {
        success: false,
        message: data.message || "API Request Failed",
        errorSources: data.errorSources,
        err: data.err,
        stack: data.stack,
      };
      throw error;
    }

    // ✅ Success return as typed data
    return data as IResponse<T>;
  } catch (error: unknown) {
    console.error("API Error:", error);

    // ✅ Ensure type safety for unknown errors
    if (typeof error === "object" && error && "message" in error) {
      throw error as IErrorResponse;
    }

    // ✅ Fallback
    throw {
      success: false,
      message: "Unexpected error occurred",
    } as IErrorResponse;
  }
}
