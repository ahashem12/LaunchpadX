import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // The `updateSession` function is called first. It refreshes the session cookie
  // and returns a new NextResponse object with the updated cookie.
  const response = await updateSession(request);

  // After the session is updated, we can create a new Supabase client
  // to get the user's authentication state.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value
          }));
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, ...options }) => {
            request.cookies.set({
              name,
              value,
              ...options as any,
            });
            response.cookies.set({
              name,
              value,
              ...options as any,
            });
          });
        },
      },
    }
  );

  // Now, fetch the user's session.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // If the user is trying to access a magic link or password reset link,
  // let the request through to the appropriate callback page.
  if (pathname === "/" && request.nextUrl.searchParams.has("code")) {
    const redirectUrl = new URL("/callback", request.url);
    redirectUrl.search = request.nextUrl.search;
    if (!redirectUrl.searchParams.has("next")) {
      // Set a default redirect path after the callback is processed.
      redirectUrl.searchParams.set("next", "/dashboard");
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Define authentication pages that an authenticated user should not see.
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  // Define the pages that require a user to be logged in.
  const isProtectedPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/browse") ||
    pathname.startsWith("/roles") ||
    pathname.startsWith("/community") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/grants") ||
    pathname.startsWith("/ventures") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/open-roles") ||
    pathname.startsWith("/legal");

  // If the user is authenticated and tries to visit an auth page (like login),
  // redirect them to the dashboard.
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If the user is authenticated and on the root path, redirect to dashboard.
  if (pathname === "/" && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // The core protection logic: if the user is trying to access a protected page
  // but is not authenticated (user object is null), redirect them to the login page.
  if (isProtectedPage && !user) {
    // We append the intended destination as a `next` query parameter.
    // This allows you to redirect the user back to their original page after they log in.
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If none of the above conditions are met, continue with the request as normal,
  // returning the response object that has the updated session cookie.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - and any files with extensions like svg, png, jpg, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
