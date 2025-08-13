import { createServerClient } from "@supabase/ssr";

// Helper function to check if we're in App Router environment
function isAppRouter() {
  try {
    // Try to access next/headers - this will throw in Pages Router
    require('next/headers');
    return true;
  } catch {
    return false;
  }
}

// Helper function to get cookies based on environment
async function getCookieStore() {
  if (isAppRouter()) {
    // App Router: use next/headers
    const { cookies } = await import('next/headers');
    return await cookies();
  }
  // Pages Router: return null (will use fallback cookie handling)
  return null;
}

export const createClient = async () => {
  const cookieStore = await getCookieStore();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (cookieStore) {
            // App Router: use cookieStore
            return cookieStore.getAll();
          }
          // Pages Router: return empty array (fallback)
          return [];
        },
        setAll(cookiesToSet) {
          if (cookieStore) {
            // App Router: use cookieStore
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch (error) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          }
          // Pages Router: cookies will be handled by middleware or client-side
        },
      },
    },
  );
};
