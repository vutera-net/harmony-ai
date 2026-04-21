import { createAuthMiddleware } from "@harmony/auth/middleware";

// MenhAn App: Premium sanctuary - most content requires auth
// But chat & onboarding are public (allow guest mode and profile setup)
export const middleware = createAuthMiddleware({
  protectedRoutes: ["/dashboard", "/master-ai", "/journal", "/reports"],
  publicRoutes: ["/", "/about", "/pricing", "/chat", "/onboarding"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
