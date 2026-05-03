import { createAuthMiddleware } from "@harmony/auth/middleware";

// Harmony Hub: Landing page - fully public
export const middleware = createAuthMiddleware({
  protectedRoutes: [],
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
