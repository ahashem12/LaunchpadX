import { API_ENDPOINTS } from "@/lib/constants/app-constants"

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  cache?: RequestCache
}

type ApiResponse<T> = {
  data: T | null
  error: string | null
  status: number
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true"

/**
 * Make an API request
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  // If using mock data, return mock data
  if (USE_MOCK_DATA) {
    return getMockData<T>(endpoint)
  }

  const { method = "GET", headers = {}, body, cache } = options

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        data: null,
        error: data.message || "An error occurred",
        status: response.status,
      }
    }

    return {
      data,
      error: null,
      status: response.status,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "An unknown error occurred",
      status: 500,
    }
  }
}

/**
 * Get mock data for development
 */
async function getMockData<T>(endpoint: string): Promise<ApiResponse<T>> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return mock data based on endpoint
  switch (endpoint) {
    case API_ENDPOINTS.AGREEMENTS:
      return {
        data: [] as unknown as T,
        error: null,
        status: 200,
      }
    case API_ENDPOINTS.PROJECTS:
      return {
        data: [] as unknown as T,
        error: null,
        status: 200,
      }
    default:
      return {
        data: null,
        error: "No mock data available for this endpoint",
        status: 404,
      }
  }
}

/**
 * API service with methods for common operations
 */
export const ApiService = {

  get: <T>(endpoint: string, options: Omit<RequestOptions, "method" | "body"> =
{
}
) =>
    apiRequest<T>(endpoint,
{
  ...options, method: "GET"
}
),

  post: <T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> =
{
}
) =>
    apiRequest<T>(endpoint,
{
  ...options, method: "POST", body: data
}
),

  put: <T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> =
{
}
) =>
    apiRequest<T>(endpoint,
{
  ...options, method: "PUT", body: data
}
),

  patch: <T>(endpoint: string, data: any, options: Omit<RequestOptions, "method"> =
{
}
) =>
    apiRequest<T>(endpoint,
{
  ...options, method: "PATCH", body: data
}
),

  delete: <T>(endpoint: string, options: Omit<RequestOptions, "method" | "body"> =
{
}
) =>
    apiRequest<T>(endpoint,
{
  ...options, method: "DELETE"
}
),
}
