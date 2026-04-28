import { createAuthMiddleware } from "@harmony/auth/middleware";

// MenhAn App: Premium sanctuary - most content requires auth
export const middleware = createAuthMiddleware({
  protectedRoutes: ["/dashboard", "/master-ai", "/journal", "/reports", "/chat", "/onboarding"],
  publicRoutes: ["/", "/about", "/pricing"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
