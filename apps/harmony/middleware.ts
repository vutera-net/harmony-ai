import { createAuthMiddleware } from "@harmony/auth/middleware";

// Harmony Hub: Landing page - mostly public
export const middleware = createAuthMiddleware({
  protectedRoutes: ["/dashboard", "/account"],
  publicRoutes: ["/", "/about", "/pricing", "/features"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
