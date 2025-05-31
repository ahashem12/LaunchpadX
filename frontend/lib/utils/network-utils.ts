/**
 * Network utility functions for handling fetch operations and network status
 */

// Check if the browser is online
export function isOnline(): boolean {
  return typeof navigator !== "undefined" && navigator.onLine
}

// Wrapper for fetch with timeout and error handling
export async function fetchWithTimeout(
  resource: RequestInfo | URL,
  options: RequestInit = {},
  timeout = 8000,
): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    if (error instanceof Error) {
      // Check if it's a network error
      if (error.name === "AbortError") {
        throw new Error("Request timeout")
      }
      if (!isOnline()) {
        throw new Error("You are offline. Please check your internet connection.")
      }
    }
    throw error
  }
}

// Retry mechanism for critical fetch operations
export async function fetchWithRetry(
  resource: RequestInfo | URL,
  options: RequestInit = {},
  retries = 3,
  backoff = 300,
): Promise<Response> {
  let lastError: Error | null = null

  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout(resource, options)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      // If we're offline, don't retry immediately
      if (!isOnline()) {
        throw new Error("You are offline. Please check your internet connection.")
      }

      // Wait with exponential backoff before retrying
      await new Promise((resolve) => setTimeout(resolve, backoff * Math.pow(2, i)))
    }
  }

  throw lastError || new Error("Failed to fetch after multiple retries")
}

// Check if a resource is available
export async function checkResourceAvailability(url: string): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(url, { method: "HEAD" }, 3000)
    return response.ok
  } catch (error) {
    return false
  }
}

// Preload critical resources
export async function preloadResources(urls: string[]): Promise<void> {
  if (typeof window === "undefined") return

  const preloads = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = url
      link.as = url.endsWith(".js")
        ? "script"
        : url.endsWith(".css")
          ? "style"
          : url.endsWith(".woff2") || url.endsWith(".woff") || url.endsWith(".ttf")
            ? "font"
            : "fetch"
      link.onload = () => resolve()
      link.onerror = () => resolve() // Resolve anyway to not block other resources
      document.head.appendChild(link)
    })
  })

  await Promise.all(preloads)
}
