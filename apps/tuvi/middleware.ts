import { createAuthMiddleware } from "@harmony/auth/middleware";

// TuVi App: mostly public, but profile & user content requires auth
export const middleware = createAuthMiddleware({
  protectedRoutes: ["/dashboard", "/my-charts", "/profile"],
  publicRoutes: ["/", "/tools/calendar", "/tools/lucky-days", "/about"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
