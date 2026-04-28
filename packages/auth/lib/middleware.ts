import { NextRequest, NextResponse } from "next/server";

const SSO_URL = process.env.NEXT_PUBLIC_SSO_URL || "http://localhost:4000";
const PROTECTED_ROUTES = ["/private", "/dashboard", "/profile", "/settings"];

/**
 * Middleware factory to create auth middleware for any Next.js app
 *
 * Usage in middleware.ts:
 * ```
 * import { createAuthMiddleware } from '@harmony/auth/middleware';
 *
 * export const middleware = createAuthMiddleware({
 *   protectedRoutes: ['/private', '/dashboard'],
 *   publicRoutes: ['/auth/login', '/auth/register'],
 * });
 *
 * export const config = {
 *   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
 * };
 * ```
 */

interface AuthMiddlewareConfig {
  protectedRoutes?: string[];
  publicRoutes?: string[];
  loginUrl?: string;
  profileUrl?: string;
  tokenCookieName?: string;
}

export function createAuthMiddleware(config: AuthMiddlewareConfig = {}) {
  const {
    protectedRoutes = PROTECTED_ROUTES,
    publicRoutes = ["/auth/login", "/auth/register", "/"],
    loginUrl = `${SSO_URL}/auth/login`,
    profileUrl = "/profile",
    tokenCookieName = "auth_token",
  } = config;

  return function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if route is public
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    if (!isProtectedRoute) {
      return NextResponse.next();
    }

    // Check for auth token in cookies
    const token = request.cookies.get(tokenCookieName)?.value;

    if (!token) {
      // No token found - redirect to SSO login
      const loginUrlObj = new URL(loginUrl);
      loginUrlObj.searchParams.set(
        "redirect",
        request.nextUrl.toString()
      );
      return NextResponse.redirect(loginUrlObj);
    }

    // Token exists, allow request
    return NextResponse.next();
  };
}

/**
 * Check if request has valid auth token
 * Returns true if token exists and is valid
 */
export function hasValidToken(request: NextRequest, cookieName = "auth_token"): boolean {
  const token = request.cookies.get(cookieName)?.value;
  return !!token;
}

/**
 * Extract token from request
 */
export function getTokenFromRequest(request: NextRequest, cookieName = "auth_token"): string | null {
  return request.cookies.get(cookieName)?.value || null;
}

/**
 * Redirect to SSO login with redirect parameter
 */
export function redirectToLogin(request: NextRequest, baseSSOUrl = SSO_URL): NextResponse {
  const loginUrl = new URL(`${baseSSOUrl}/auth/login`);
  loginUrl.searchParams.set("redirect", request.nextUrl.toString());
  return NextResponse.redirect(loginUrl);
}
